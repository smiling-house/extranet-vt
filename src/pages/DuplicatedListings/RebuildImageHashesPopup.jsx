import React, { useEffect, useMemo, useRef, useState } from "react";
import swal from "sweetalert";

import constants from "../../Util/constants";

import "./RebuildImageHashesPopup.scss";

const REBUILD_IMAGE_HASHES_ENDPOINT = "/rebuildimagehashes";

const readNdjsonStream = async (stream, onMessage) => {
  if (!stream) {
    throw new Error("Streaming not supported (empty response body)");
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      try {
        onMessage(JSON.parse(trimmed));
      } catch (err) {
        onMessage({ type: "parse_error", raw: trimmed, message: err?.message || "Failed to parse JSON" });
      }
    }
  }

  const last = buffer.trim();
  if (last) {
    try {
      onMessage(JSON.parse(last));
    } catch (err) {
      onMessage({ type: "parse_error", raw: last, message: err?.message || "Failed to parse JSON" });
    }
  }
};

const coerceFiniteNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const num = Number(trimmed);
    return Number.isFinite(num) ? num : null;
  }
  return null;
};

// Developer switches
// Set true to include noisy intermediary image phases (start/fetch_try/fetch_success).
// Keeping it as a constant makes it easy to hide by changing one line.
const SHOW_IMAGE_INTERMEDIARY_LOGS = false;
const IMAGE_FINAL_PHASES = new Set(["hashed", "failed"]);
const IMAGE_INTERMEDIARY_PHASES = new Set(["start", "fetch_try", "fetch_success"]);

const formatTs = (ts) => {
  try {
    const d = ts ? new Date(ts) : new Date();
    if (Number.isNaN(d.getTime())) return new Date().toLocaleTimeString();
    return d.toLocaleTimeString();
  } catch (e) {
    return new Date().toLocaleTimeString();
  }
};

const compactJson = (value) => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return String(value);
  }
};

const pushCapped = (arr, item, cap = 200) => {
  const next = Array.isArray(arr) ? [...arr, item] : [item];
  if (next.length <= cap) return next;
  return next.slice(next.length - cap);
};

const LISTING_LOG_LIMIT = 50;
const META_LOG_KEY = "__meta__";

const RebuildImageHashesPopup = ({ open, onClose, token, onToast }) => {

// Optional query params
// ids=VIB-1089,sh10067 (for testing)
// force=true (recompute even if hashes already exist)
// batchSize=25 (Mongo cursor batch size; internal DB batching)
// concurrency=2 (parallel hashing/download tasks per listing)
// minDelayMs=100 (rate limit between image fetches globally)
// maxListings=100 (safety limit for testing)

  const abortRef = useRef(null);
  const autoStartedRef = useRef(false);
  const prevOpenRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const [logState, setLogState] = useState({ order: [], byKey: {}, meta: [] });
  const [autoScrollLogs, setAutoScrollLogs] = useState(true);
  const logEndRef = useRef(null);

  const [progress, setProgress] = useState({
    active: false,
    done: false,
    total: 0,
    processed: 0,
    updated: 0,
    skipped: 0,
    errorCount: 0,
    lastListingId: null,
    lastStatus: null,
  });

  const percent = useMemo(() => {
    if (!progress?.total) return 0;
    return Math.min(100, Math.max(0, Math.round((progress.processed / progress.total) * 100)));
  }, [progress]);

  const logs = useMemo(() => {
    const lines = [];
    if (Array.isArray(logState.meta) && logState.meta.length) {
      lines.push(...logState.meta);
    }
    for (const key of logState.order || []) {
      const bucket = logState.byKey?.[key];
      if (Array.isArray(bucket) && bucket.length) {
        lines.push(...bucket);
      }
    }
    return lines;
  }, [logState]);

  const clearLogs = () => {
    setLogState({ order: [], byKey: {}, meta: [] });
  };

  const appendLog = (key, line) => {
    if (!line) return;

    setLogState((prev) => {
      const next = {
        order: Array.isArray(prev.order) ? [...prev.order] : [],
        byKey: prev.byKey ? { ...prev.byKey } : {},
        meta: Array.isArray(prev.meta) ? prev.meta : [],
      };

      const normalizedKey = key || META_LOG_KEY;

      if (normalizedKey === META_LOG_KEY) {
        next.meta = pushCapped(next.meta, line, 200);
        return next;
      }

      if (!next.byKey[normalizedKey]) {
        next.byKey[normalizedKey] = [];
      }
      next.byKey[normalizedKey] = [...next.byKey[normalizedKey], line];

      if (!next.order.includes(normalizedKey)) {
        next.order.push(normalizedKey);
      }

      while (next.order.length > LISTING_LOG_LIMIT) {
        const evicted = next.order.shift();
        if (evicted) delete next.byKey[evicted];
      }

      return next;
    });
  };

  const copyLogs = async () => {
    const text = logs.join("\n");
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      onToast?.("Copied log to clipboard");
    } catch (e) {
      swal({
        icon: "error",
        title: "Copy failed",
        text: "Browser blocked clipboard access. Try selecting the log and copying manually.",
      });
    }
  };

  useEffect(() => {
    if (!autoScrollLogs) return;
    logEndRef.current?.scrollIntoView({ block: "end" });
  }, [logs, autoScrollLogs]);

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, []);

  const start = async () => {
    if (isRunning) return;

    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsRunning(true);
    setRequestError(null);
    clearLogs();
    setProgress((prev) => ({
      ...prev,
      active: true,
      done: false,
      total: 0,
      processed: 0,
      updated: 0,
      skipped: 0,
      errorCount: 0,
      lastListingId: null,
      lastStatus: null,
    }));

    // &ids=sh9894, VIB-466&force=true
    const url = `${constants.SHUB_URL}${REBUILD_IMAGE_HASHES_ENDPOINT}?stream=true`;
    let endedByFatal = false;
    let fatalMessage = "";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": constants.X_API_KEY,
        },
        body: JSON.stringify({}),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        const message = errText || `HTTP ${res.status}`;
        setRequestError({ status: res.status, message });
        throw new Error(message);
      }

      await readNdjsonStream(res.body, (msg) => {
        if (!msg || typeof msg !== "object") return;

        // Live log
        if (msg.type === "listing") {
          const ts = formatTs(msg.ts);
          const listingId = msg.listingId || msg.listingID || msg.id || "?";
          const status = msg.status || "?";

          const reason = msg.reason || msg.message || msg.error || null;
          const errors = Array.isArray(msg.errors) ? msg.errors : null;

          let line = `[${ts}] listing ${listingId} • ${status}`;
          if (reason) line += ` • ${reason}`;
          if (errors && errors.length) line += ` • errors=${compactJson(errors)}`;

          appendLog(listingId, line);
        }

        if (msg.type === "image") {
          const phase = msg.phase || "?";
          // Always show fetch errors (even when intermediary phases are hidden).
          const shouldLog =
            IMAGE_FINAL_PHASES.has(phase) ||
            phase === "fetch_error" ||
            (SHOW_IMAGE_INTERMEDIARY_LOGS && IMAGE_INTERMEDIARY_PHASES.has(phase));

          if (shouldLog) {
            const ts = formatTs(msg.ts);
            const listingId = msg.listingId || msg.listingID || msg.id || "?";
            const kind = msg.kind || "?";
            const urlStr = msg.url || "";

            let line = `[${ts}] image ${listingId} • ${kind} • ${phase}`;
            if (urlStr) line += ` • ${urlStr}`;

            // Enrich with common phase fields
            if (msg.attemptIndex != null && msg.attempts != null) line += ` • try=${msg.attemptIndex + 1}/${msg.attempts}`;
            if (msg.status != null) line += ` • status=${msg.status}`;
            if (msg.code) line += ` • code=${msg.code}`;
            if (msg.message) line += ` • msg=${msg.message}`;
            if (msg.error) line += ` • error=${msg.error}`;
            if (msg.contentType) line += ` • ct=${msg.contentType}`;
            if (msg.byteLength != null) line += ` • bytes=${msg.byteLength}`;
            if (msg.hash) line += ` • hash=${msg.hash}`;

            appendLog(listingId, line);
          }
        }

        // Backend can emit a fatal event (e.g. cursor failures). Stop and surface it.
        if (msg.type === "fatal") {
          endedByFatal = true;
          fatalMessage = msg.error || "Fatal error from server";
          setRequestError({ status: null, message: fatalMessage });
          setProgress((prev) => ({
            ...prev,
            active: false,
            done: true,
            lastStatus: "fatal",
            errorCount: (prev.errorCount || 0) + 1,
          }));
          controller.abort();
          return;
        }

        if (msg.type === "parse_error") {
          const ts = formatTs(msg.ts);
          appendLog(META_LOG_KEY, `[${ts}] parse_error • ${msg.message || "Failed to parse"}`);
        }

        setProgress((prev) => {
          const next = { ...prev };

          const total = coerceFiniteNumber(msg.total);
          const processed = coerceFiniteNumber(msg.processed);
          const updated = coerceFiniteNumber(msg.updated);
          const skipped = coerceFiniteNumber(msg.skipped);
          const errorCount = coerceFiniteNumber(msg.errorCount);

          if (total !== null && total > 0) next.total = total;
          if (processed !== null) next.processed = processed;
          if (updated !== null) next.updated = updated;
          if (skipped !== null) next.skipped = skipped;
          if (errorCount !== null) next.errorCount = errorCount;

          if (msg.type === "listing") {
            const listingId = msg.listingId || msg.listingID || msg.id;
            if (listingId) next.lastListingId = listingId;
            if (msg.status) next.lastStatus = msg.status;
          }

          if (msg.type === "parse_error") {
            next.errorCount = (next.errorCount || 0) + 1;
          }

          if (msg.type === "done") {
            next.active = false;
            next.done = true;
          }

          return next;
        });
      });

      setProgress((prev) => ({
        ...prev,
        active: false,
        done: true,
      }));

      onToast?.("Rebuild finished");
    } catch (err) {
      const wasAborted = err?.name === "AbortError";
      if (wasAborted && endedByFatal) {
        swal({
          icon: "error",
          title: "Rebuild failed",
          text: fatalMessage || "Fatal error from server",
        });
      } else if (wasAborted) {
        appendLog(META_LOG_KEY, `[${formatTs()}] cancelled by user`);
        onToast?.("Rebuild cancelled");
        setProgress((prev) => ({
          ...prev,
          active: false,
          done: true,
          lastStatus: "cancelled",
        }));
      } else {
        setRequestError((prev) => prev || { status: null, message: err?.message || "Failed" });
        swal({
          icon: "error",
          title: "Rebuild failed",
          text: err?.message || "Failed to rebuild image hashes.",
        });
      }
      setProgress((prev) => ({ ...prev, active: false }));
    } finally {
      setIsRunning(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    // Auto-start only once per open (prevents loops + repeated requests).
    if (open && !prevOpenRef.current) {
      prevOpenRef.current = true;
      autoStartedRef.current = false;

      setIsRunning(false);
      setRequestError(null);
      clearLogs();
      setProgress({
        active: false,
        done: false,
        total: 0,
        processed: 0,
        updated: 0,
        skipped: 0,
        errorCount: 0,
        lastListingId: null,
        lastStatus: null,
      });

      const timerId = setTimeout(() => {
        if (autoStartedRef.current) return;
        autoStartedRef.current = true;
        start();
      }, 0);

      return () => clearTimeout(timerId);
    }

    if (!open) {
      prevOpenRef.current = false;
      autoStartedRef.current = false;
    }

    return undefined;
  }, [open]);

  const cancel = () => {
    if (abortRef.current) abortRef.current.abort();
  };

  const close = () => {
    if (progress.active) {
      swal({
        title: "Rebuild running",
        text: "A rebuild is still running. Cancel it first to close this window.",
        icon: "warning",
      });
      return;
    }
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="reh-overlay" role="dialog" aria-modal="true" aria-label="Rebuild image hashes">
      <div className="reh-modal">
        <div className="reh-header">
          <div className="reh-title">Rebuild Image Hashes</div>
          <button type="button" className="reh-close" onClick={close} aria-label="Close">
            ×
          </button>
        </div>

        <div className="reh-body">
          <div className="reh-note">
            Note: this process may take some time to complete, depending on the number of listings and images.
          </div>
          {/* <div className="reh-row">
            <div className="reh-label">Mode</div>
            <div style={{ fontWeight: 700, color: "#374151" }}>Streaming progress (NDJSON)</div>
          </div> */}

          {requestError && (
            <div className="reh-errors" role="alert">
              <div className="reh-errors-title">Error</div>
              <div style={{ fontWeight: 700, color: "#b91c1c" }}>
                {requestError.status ? `HTTP ${requestError.status}` : "Request failed"}
                {requestError.message ? `: ${requestError.message}` : ""}
              </div>
            </div>
          )}

          {(progress.active || progress.done) && (
            <div className="reh-progress">
              <div className="reh-progress-top">
                <div className="reh-progress-title">
                  {(progress?.lastStatus === "cancelled" ? "Cancelled" : progress?.lastStatus === "fatal" ? "Failed" : "Progress")}: {percent}%
                </div>
                <div className="reh-progress-meta">
                  {progress.processed}/{progress.total || "?"} processed • {progress.updated} updated • {progress.skipped} skipped • {progress.errorCount} errors
                </div>
              </div>
              <div className="reh-bar" aria-hidden="true">
                <div className="reh-bar-fill" style={{ width: `${percent}%` }} />
              </div>
              {progress.lastListingId && (
                <div className="reh-last">
                  Last: {progress.lastListingId}
                </div>
              )}

              <div className="reh-log">
                <div className="reh-log-header">
                  <div className="reh-log-title">Live log</div>
                  <div className="reh-log-actions">
                    <label className="reh-log-toggle">
                      <input
                        type="checkbox"
                        checked={autoScrollLogs}
                        onChange={(e) => setAutoScrollLogs(e.target.checked)}
                      />
                      Auto-scroll
                    </label>
                    <button
                      type="button"
                      className="reh-btn reh-btn-secondary reh-btn-sm"
                      onClick={copyLogs}
                      disabled={!logs.length}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      className="reh-btn reh-btn-secondary reh-btn-sm"
                      onClick={clearLogs}
                      disabled={!logs.length}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="reh-log-box" role="log" aria-live="polite">
                  {logs.length === 0 ? (
                    <div className="reh-log-empty">Waiting for stream events…</div>
                  ) : (
                    logs.map((line, index) => (
                      <div key={`${index}-${line.slice(0, 24)}`} className="reh-log-line">
                        {line}
                      </div>
                    ))
                  )}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="reh-footer">
          <button type="button" className="reh-btn reh-btn-secondary" onClick={close} disabled={progress.active}>
            Close
          </button>
          <div className="reh-footer-right">
            <button type="button" className="reh-btn reh-btn-secondary" onClick={cancel} disabled={!progress.active}>
              Cancel
            </button>
            <button type="button" className="reh-btn reh-btn-primary" onClick={start} disabled={progress.active || isRunning}>
              {progress.active ? "Running..." : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebuildImageHashesPopup;
