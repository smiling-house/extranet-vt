// ---------------------------------------------------------------------------
// AdminSettings — admin-only tools page.
//
// This round ships one tool: Bulk Welcome Emails. Rate-limited async job
// that re-sends the redesigned welcome email to every partner with an email
// address on file. Kicked off from this page; server tracks progress in a
// BulkEmailJob doc; UI polls /local/bulk-welcome-emails/:runId every 3s
// until status flips out of "running".
//
// Design notes:
//   * Same visual language as AdminDashboard — Layout wrapper, page-hero
//     band, dash-card / dash-kpi-grid classes reused from theme-dashboard.
//   * Server is source of truth. On mount we fetch /latest so a browser
//     refresh doesn't lose track of an in-flight job.
//   * No client-side job state kept across polls — the polled `job` object
//     drives every render.
//   * Confirmation swal before Start, warning about count + ETA. Cancel is
//     immediate (no confirm) since the worker checks status between sends
//     and the user can always Start again.
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  FiSend,
  FiPlay,
  FiSquare,
  FiClock,
  FiUsers,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

import Layout from "../../components/Layout/index.js";
import constants from "../../Util/constants";
import "./AdminSettings.scss";

const POLL_MS = 3000;

const userRequest = axios.create({
  baseURL: constants.SHUB_URL,
  headers: { Authorization: constants.SHUB_TOKEN },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMinutes(mins) {
  if (mins == null || Number.isNaN(mins)) return "—";
  if (mins < 1) return "under a minute";
  if (mins < 60) return `${Math.round(mins)} min`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return `${h}h ${m}m`;
}

function formatDuration(ms) {
  if (!ms || Number.isNaN(ms)) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

function formatRelative(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  const diffSec = Math.round((Date.now() - d.getTime()) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} h ago`;
  return d.toLocaleString();
}

const STATUS_LABEL = {
  running: "Running",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AdminSettings = (props) => {
  const {
    token,
    agency,
    agent,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;

  const agentData = useMemo(() => {
    try {
      return agent ? JSON.parse(agent) : null;
    } catch {
      return null;
    }
  }, [agent]);
  const firstName = agentData?.firstName || "there";

  // Job form state
  const [delaySec, setDelaySec] = useState(3);
  // Force-resend defaults OFF so cancel+restart doesn't re-mail
  // already-sent partners. Admin explicitly opts in.
  const [force, setForce] = useState(false);

  // Server-owned job state
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  const pollRef = useRef(null);
  const isRunning = job?.status === "running";

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const fetchJob = useCallback(async (runId) => {
    try {
      const res = await userRequest.get(`local/bulk-welcome-emails/${runId}`);
      return res?.data?.job || null;
    } catch (e) {
      return null;
    }
  }, []);

  const startPolling = useCallback(
    (runId) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        const next = await fetchJob(runId);
        if (next) {
          setJob(next);
          if (next.status !== "running") stopPolling();
        }
      }, POLL_MS);
    },
    [fetchJob, stopPolling]
  );

  // On mount: hydrate from /latest; if a job is running, resume polling.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await userRequest.get("local/bulk-welcome-emails/latest");
        if (cancelled) return;
        const latest = res?.data?.job || null;
        setJob(latest);
        if (latest?.status === "running") startPolling(latest.runId);
      } catch (_) {
        // silently ignore — page is still usable to start a new job
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  const handleStart = useCallback(async () => {
    const delayMs = Math.max(1000, Math.min(10000, Number(delaySec) * 1000 || 3000));
    const cohortNote = force
      ? "Force resend is ON — every eligible partner will be mailed, even those already flagged as sent."
      : "Force resend is OFF — partners already flagged as sent (emailSent=true) will be skipped.";
    const confirmMsg = `This will send the redesigned welcome email at ${delaySec}s intervals. ${cohortNote} The server will show a live progress tracker below. Continue?`;
    const ok = await swal({
      title: "Start bulk welcome-email backfill?",
      text: confirmMsg,
      icon: "warning",
      buttons: ["Cancel", "Start"],
      dangerMode: force,
    });
    if (!ok) return;

    setStarting(true);
    try {
      const res = await userRequest.post("local/bulk-welcome-emails/start", {
        cohort: "all-with-email",
        force,
        delayMs,
        triggeredByAgent: agentData?.email || agentData?.firstName || null,
      });
      const data = res?.data;
      if (data?.conflict) {
        await swal({
          title: "Another run is already in progress",
          text: `A backfill (runId ${data.runId}) is already running. Wait for it to finish or cancel it first.`,
          icon: "info",
        });
        // Hydrate to show the in-flight one.
        const existing = await fetchJob(data.runId);
        if (existing) {
          setJob(existing);
          if (existing.status === "running") startPolling(existing.runId);
        }
        return;
      }
      if (!data?.success) {
        await swal({
          title: "Could not start",
          text: data?.message || "Server rejected the start request.",
          icon: "error",
        });
        return;
      }
      // Fetch the fresh job doc + start polling.
      const fresh = await fetchJob(data.runId);
      if (fresh) {
        setJob(fresh);
        startPolling(fresh.runId);
      }
    } catch (e) {
      swal({
        title: "Failed to start",
        text: e?.response?.data?.error || e?.message || String(e),
        icon: "error",
      });
    } finally {
      setStarting(false);
    }
  }, [agentData, delaySec, force, fetchJob, startPolling]);

  const handleCancel = useCallback(async () => {
    if (!job?.runId) return;
    setCancelling(true);
    try {
      await userRequest.post(`local/bulk-welcome-emails/${job.runId}/cancel`);
      // Let the poll pick up the cancelled state — worker finishes its
      // in-flight send then flips status.
      const fresh = await fetchJob(job.runId);
      if (fresh) setJob(fresh);
    } catch (e) {
      swal({
        title: "Cancel failed",
        text: e?.response?.data?.error || e?.message || String(e),
        icon: "error",
      });
    } finally {
      setCancelling(false);
    }
  }, [fetchJob, job]);

  const handleRefresh = useCallback(async () => {
    if (!job?.runId) return;
    const fresh = await fetchJob(job.runId);
    if (fresh) setJob(fresh);
  }, [fetchJob, job]);

  // Download the CSV for the current job. Fetches as blob (so we can send
  // the bearer token in the header) and triggers a hidden <a download>.
  const handleDownloadCsv = useCallback(async () => {
    if (!job?.runId) return;
    setDownloadingCsv(true);
    try {
      const res = await userRequest.get(
        `local/bulk-welcome-emails/${job.runId}/results.csv`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bulk-welcome-emails-${job.runId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      swal({
        title: "Download failed",
        text: e?.response?.data?.error || e?.message || String(e),
        icon: "error",
      });
    } finally {
      setDownloadingCsv(false);
    }
  }, [job]);

  // --- Derived progress metrics ---
  const total = job?.total || 0;
  const sent = job?.sent || 0;
  const skipped = job?.skipped || 0;
  const failed = job?.failed || 0;
  const processed = sent + skipped + failed;
  const percent = total > 0 ? Math.min(100, Math.round((processed / total) * 100)) : 0;
  const remaining = Math.max(0, total - processed);
  const etaMinutes =
    isRunning && job?.delayMs
      ? Math.round((remaining * job.delayMs) / 60000)
      : null;
  const statusLabel = STATUS_LABEL[job?.status] || "—";
  const recentResults = useMemo(() => {
    const rows = Array.isArray(job?.results) ? job.results : [];
    return rows.slice(-20).reverse();
  }, [job?.results]);

  return (
    <Layout
      pageTitle="Admin Settings"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="admin-settings">
        {/* Hero */}
        <div className="page-hero dash-hero">
          <div className="page-hero-left">
            <div className="page-hero-icon page-hero-icon--dash">
              <FiSend size={22} />
            </div>
            <div>
              <h1 className="page-hero-title">Admin Settings</h1>
              <p className="page-hero-subhead">
                Operational tools — kick off, monitor, cancel long-running admin jobs
              </p>
            </div>
          </div>
        </div>

        {/* Bulk welcome emails */}
        <section className="dash-card as-card">
          <header className="dash-card-header">
            <h2 className="dash-card-title">Bulk Welcome Emails</h2>
            <p className="dash-card-subtitle">
              Re-send the redesigned welcome email to every partner with an email
              address on file. Rate-limited so SMTP doesn't spam-filter us.
            </p>
          </header>

          <div className="dash-card-body as-tool-body">
            {/* Job form */}
            <div className="as-form-grid">
              <div className="as-form-field">
                <label className="as-label">Cohort</label>
                <div className="as-chip locked">All partners with an email</div>
                <p className="as-hint">
                  Only cohort available this round. More filters will come once we
                  can lean on the new lastExtranetLogin field.
                </p>
              </div>

              <div className="as-form-field">
                <label className="as-label" htmlFor="delay">
                  Delay between sends
                </label>
                <div className="as-slider-row">
                  <input
                    id="delay"
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={delaySec}
                    disabled={isRunning || starting}
                    onChange={(e) => setDelaySec(Number(e.target.value))}
                    className="as-slider"
                  />
                  <div className="as-slider-value">{delaySec}s</div>
                </div>
                <p className="as-hint">
                  3s (~1,200/hour) is a safe SMTP default. Lower is faster but risks
                  spam-filter throttling.
                </p>
              </div>

              <div className="as-form-field">
                <label className="as-label" htmlFor="force-toggle">Force resend</label>
                <div className="as-toggle-row">
                  <button
                    id="force-toggle"
                    type="button"
                    role="switch"
                    aria-checked={force}
                    disabled={isRunning || starting}
                    onClick={() => setForce((f) => !f)}
                    className={`as-toggle-pill ${force ? "on" : "off"}`}
                    title={force ? "Turn force resend off" : "Turn force resend on"}
                  >
                    {force ? "ON" : "OFF"}
                  </button>
                </div>
                <p className="as-hint">
                  {force
                    ? "Ignores emailSent flags — sends to everyone in the cohort, including partners already mailed."
                    : "Skips partners already flagged as sent (emailSent=true)."}
                </p>
              </div>

              <div className="as-form-actions">
                <button
                  type="button"
                  className="as-btn as-btn--primary"
                  onClick={handleStart}
                  disabled={isRunning || starting}
                  title={
                    isRunning
                      ? "A job is already running"
                      : "Start the backfill"
                  }
                >
                  <FiPlay size={14} />
                  <span>{starting ? "Starting…" : "Start backfill"}</span>
                </button>
              </div>
            </div>

            {/* Live progress panel */}
            {loading && !job ? (
              <div className="as-loading">Loading latest job…</div>
            ) : job ? (
              <div className={`as-progress as-progress--${job.status}`}>
                <div className="as-progress-header">
                  <div className="as-progress-title">
                    <span className={`as-status-pill as-status-pill--${job.status}`}>
                      {statusLabel}
                    </span>
                    <span className="as-run-id" title={job.runId}>
                      {job.runId}
                    </span>
                  </div>
                  <div className="as-progress-actions">
                    <button
                      type="button"
                      className="as-btn as-btn--ghost"
                      onClick={handleRefresh}
                      title="Refresh"
                    >
                      <FiRefreshCw size={13} />
                      <span>Refresh</span>
                    </button>
                    {isRunning && (
                      <button
                        type="button"
                        className="as-btn as-btn--danger"
                        onClick={handleCancel}
                        disabled={cancelling}
                      >
                        <FiSquare size={13} />
                        <span>{cancelling ? "Cancelling…" : "Cancel"}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="as-progress-bar-wrap">
                  <div
                    className="as-progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="as-progress-numeric">
                  <strong>{processed}</strong> / {total} processed
                  <span className="as-progress-split">
                    · sent <strong>{sent}</strong>
                  </span>
                  <span className="as-progress-split">
                    · skipped <strong>{skipped}</strong>
                  </span>
                  <span className="as-progress-split">
                    · failed <strong>{failed}</strong>
                  </span>
                </div>

                <div className="as-progress-meta">
                  <div>
                    <FiUsers size={13} />
                    <span className="as-meta-label">Currently sending to:</span>
                    <span className="as-meta-value">
                      {job.currentAccountId || "—"}
                      {job.currentEmail ? ` · ${job.currentEmail}` : ""}
                    </span>
                  </div>
                  <div>
                    <FiClock size={13} />
                    <span className="as-meta-label">Started:</span>
                    <span className="as-meta-value">
                      {formatRelative(job.startedAt)}
                    </span>
                  </div>
                  {isRunning ? (
                    <div>
                      <FiClock size={13} />
                      <span className="as-meta-label">ETA:</span>
                      <span className="as-meta-value">
                        {formatMinutes(etaMinutes)} remaining
                      </span>
                    </div>
                  ) : (
                    <div>
                      <FiClock size={13} />
                      <span className="as-meta-label">Duration:</span>
                      <span className="as-meta-value">
                        {formatDuration(job.durationMs)}
                      </span>
                    </div>
                  )}
                </div>

                {job.errorMessage && (
                  <div className="as-error-banner">
                    <strong>Job error:</strong> {job.errorMessage}
                  </div>
                )}
              </div>
            ) : (
              <div className="as-empty">
                No previous runs yet. Start a backfill above.
              </div>
            )}

            {/* Recent results */}
            {job && recentResults.length > 0 && (
              <div className="as-results">
                <div className="as-results-header">
                  <h3 className="as-results-title">
                    Recent sends
                    <span className="as-results-count">
                      ({recentResults.length}
                      {job.results?.length > recentResults.length
                        ? ` of ${job.results.length}`
                        : ""}
                      )
                    </span>
                  </h3>
                  <button
                    type="button"
                    className="as-btn as-btn--ghost"
                    onClick={handleDownloadCsv}
                    disabled={downloadingCsv}
                    title={`Download the full results (${job.results?.length || 0} rows) as CSV`}
                  >
                    <FiDownload size={13} />
                    <span>{downloadingCsv ? "Downloading…" : "Download CSV"}</span>
                  </button>
                </div>
                <div className="as-results-table-wrap">
                  <table className="as-results-table">
                    <thead>
                      <tr>
                        <th>Account ID</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentResults.map((r, i) => (
                        <tr key={`${r.accountId}-${r.at || i}`}>
                          <td className="as-mono">{r.accountId || "—"}</td>
                          <td>{r.email || "—"}</td>
                          <td>
                            <span
                              className={`as-status-pill as-status-pill--${r.status}`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="as-reason">{r.reason || "—"}</td>
                          <td className="as-mono">
                            {r.at ? formatRelative(r.at) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdminSettings;
