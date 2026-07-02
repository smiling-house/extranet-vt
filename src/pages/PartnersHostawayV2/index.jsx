// -------------------------------------------------------------------------
// PartnersHostawayV2 — modern redesign of the Hostaway PMS admin page.
//
// Shares the visual chrome (hero, toolbar, table card, mobile stacked cards)
// with PartnersListView but has its own columns and row actions because
// Hostaway is a channel-admin surface, not a status-counts list:
//
//   * Connect a new Hostaway account
//   * Sync a specific account on demand
//   * Run the create+cancel Booking Demo
//   * Drill into that account's synced listings (via /listings)
//
// Data comes from a single call to AuthService.listHostawayPartners() — no
// server-side pagination, small user base. Search filters client-side.
// -------------------------------------------------------------------------

import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import {
  FiChevronRight,
  FiRefreshCw,
  FiPlus,
  FiPlayCircle,
  FiList,
  FiGrid,
  FiColumns,
} from "react-icons/fi";

import Layout from "../../components/Layout";
import AuthService from "../../services/auth.service";
import EditPartner from "../PartnersHostaway/EditPartner";
import BookingDemo from "../PartnersHostaway/BookingDemo";
import { PATH_LISTINGS } from "../../Util/constants";
import "../PartnersListView/PartnersListView.scss";
import "./PartnersHostawayV2.scss";

// Same view modes + localStorage key as PartnersListView — switching between
// Guesty PMs / RU PMs / Hostaway PMs remembers your last-chosen layout.
const VIEW_MODES = [
  { key: "rows",  label: "Rows",  Icon: FiList },
  { key: "grid",  label: "Grid",  Icon: FiGrid },
  { key: "table", label: "Table", Icon: FiColumns },
];
const VIEW_MODE_LS_KEY = "partners_view_mode";

const PartnersHostawayV2 = (props) => {
  const {
    token,
    agency,
    agent,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;
  const history = useHistory();

  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showBookingDemo, setShowBookingDemo] = useState(null);
  const [syncingId, setSyncingId] = useState(null);
  const [searchRaw, setSearchRaw] = useState("");
  const [viewMode, setViewMode] = useState(() => {
    const saved = (typeof window !== "undefined") && localStorage.getItem(VIEW_MODE_LS_KEY);
    return VIEW_MODES.some((m) => m.key === saved) ? saved : "rows";
  });
  const changeViewMode = (next) => {
    setViewMode(next);
    try { localStorage.setItem(VIEW_MODE_LS_KEY, next); } catch (_) {}
  };

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const res = await AuthService.listHostawayPartners();
      setPartners(res?.data?.accounts || []);
    } catch (e) {
      swal({
        icon: "error",
        title: "Failed to load Hostaway partners",
        text: e?.response?.data?.error || e?.message || String(e),
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  // Client-side search over accountId / vtAccountId / pmName. Small dataset
  // — no debounce needed here.
  const filteredPartners = useMemo(() => {
    const q = searchRaw.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter((p) => {
      const hay = `${p.accountId || ""} ${p.vtAccountId || ""} ${p.pmName || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [partners, searchRaw]);

  const onSyncNow = async (accountId) => {
    setSyncingId(accountId);
    try {
      const res = await AuthService.triggerHostawaySync(accountId);
      const steps = res?.data?.accounts?.[0]?.steps || [];
      const failed = steps.filter((s) => !s.ok).length;
      if (res?.data?.ok && failed === 0) {
        swal({
          icon: "success",
          title: "Sync complete",
          text: `${steps.length} steps OK`,
        });
      } else {
        const firstFail = steps.find((s) => !s.ok);
        swal({
          icon: "warning",
          title: "Sync had issues",
          text: `${failed} step(s) failed. First: ${firstFail?.name || "?"}`,
        });
      }
      loadPartners();
    } catch (e) {
      swal({
        icon: "error",
        title: "Sync failed",
        text: e?.response?.data?.error || e?.message || String(e),
      });
    }
    setSyncingId(null);
  };

  const onViewListings = (partner) => {
    const canonicalAccountId = `HW-${partner.accountId}`;
    // step_hwUpsertIntoListings hardcodes channelSource:"Hostaway" on the
    // canonical row, so we must pass that exact string (not "HW").
    const partnerForListings = {
      ...partner,
      accountId: canonicalAccountId,
      source: "Hostaway",
      pmName: partner.pmName || "Hostaway",
    };
    localStorage.setItem("partner", JSON.stringify(partnerForListings));
    history.push(PATH_LISTINGS, {
      partner: partnerForListings,
      accountId: canonicalAccountId,
      source: "Hostaway",
    });
  };

  const onConnectClosed = (didConnect) => {
    setShowConnect(false);
    if (didConnect) loadPartners();
  };

  // Small helper — status text with a coloured dot.
  const SyncStatus = ({ status, lastSyncAt }) => {
    if (!lastSyncAt) {
      return (
        <span className="hostaway-status hostaway-status--never">
          <span className="dot" /> Never synced
        </span>
      );
    }
    const s = String(status || "").toLowerCase();
    const variant = s === "ok" || s === "success" ? "ok" : s ? "warn" : "unknown";
    return (
      <span className={`hostaway-status hostaway-status--${variant}`}>
        <span className="dot" /> {status || "—"}
      </span>
    );
  };

  return (
    <Layout
      pageTitle="Hostaway PMs"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="partners-view partners-hostaway">
        {/* Hero */}
        <div className="page-hero">
          <div className="page-hero-left">
            <div className="page-hero-icon page-hero-icon--purple">
              <span className="hostaway-h-badge">H</span>
            </div>
            <div>
              <h1 className="page-hero-title">Hostaway PMs</h1>
              <p className="page-hero-subhead">
                Property managers integrated via the Hostaway channel
              </p>
            </div>
          </div>
          <div className="page-hero-meta">
            <span className="page-hero-pill">
              {filteredPartners.length} partner
              {filteredPartners.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by Account ID, VT Partner or PM name…"
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              aria-label="Search Hostaway partners"
            />
            {searchRaw && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchRaw("")}
                aria-label="Clear search"
                title="Clear search"
              >
                <IoMdClose size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="hostaway-connect-btn"
            onClick={() => setShowConnect(true)}
          >
            <FiPlus size={16} />
            <span>Connect Hostaway partner</span>
          </button>

          {/* View switcher — same 3 modes as PartnersListView, shared storage key */}
          <div className="view-switcher" role="tablist" aria-label="View mode">
            {VIEW_MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={viewMode === m.key}
                className={viewMode === m.key ? "active" : ""}
                onClick={() => changeViewMode(m.key)}
                title={m.label}
              >
                <m.Icon size={14} />
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body — switches by viewMode */}
        <div className={`partners-card partners-card--${viewMode}`}>
          {viewMode === "grid" ? (
            <div className="partners-grid hostaway-grid">
              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div className="partner-card is-skeleton" key={`skel-card-${i}`}>
                    <span className="skeleton-block" style={{ width: 140, height: 18 }} />
                    <span className="skeleton-block" style={{ width: 180, height: 12, marginTop: 8 }} />
                    <span className="skeleton-block" style={{ width: 100, height: 12, marginTop: 6 }} />
                  </div>
                ))}

              {!isLoading &&
                filteredPartners.map((p, idx) => (
                  <div
                    className="partner-card hostaway-card"
                    key={p.accountId}
                    onClick={() => onViewListings(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onViewListings(p);
                      }
                    }}
                  >
                    <div className="partner-card-header">
                      <span className="partner-card-serial">#{idx + 1}</span>
                      <FiChevronRight className="row-arrow" />
                    </div>
                    <h3 className="partner-card-name">{p.accountId}</h3>
                    <div className="partner-card-accountid">
                      {p.vtAccountId ? `VT: ${p.vtAccountId}` : "— no VT partner —"}
                    </div>
                    <div className="hostaway-card-meta">
                      <div>
                        <span className="hostaway-card-meta-label">Timezone</span>
                        <span className="hostaway-card-meta-value">{p.timezone || "—"}</span>
                      </div>
                      <div>
                        <span className="hostaway-card-meta-label">Webhook</span>
                        <span className="hostaway-card-meta-value">{p.webhookId ? "Yes" : "—"}</span>
                      </div>
                      <div>
                        <span className="hostaway-card-meta-label">Last Sync</span>
                        <span className="hostaway-card-meta-value">
                          {p.lastSyncAt ? new Date(p.lastSyncAt).toLocaleDateString() : "Never"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <SyncStatus status={p.lastSyncStatus} lastSyncAt={p.lastSyncAt} />
                    </div>
                    <div
                      className="hostaway-card-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="hostaway-action-btn primary"
                        disabled={syncingId === p.accountId}
                        onClick={() => onSyncNow(p.accountId)}
                      >
                        <FiRefreshCw
                          size={13}
                          className={syncingId === p.accountId ? "spinning" : ""}
                        />
                        {syncingId === p.accountId ? "Syncing…" : "Sync now"}
                      </button>
                      <button
                        className="hostaway-action-btn outline"
                        onClick={() => setShowBookingDemo(p)}
                      >
                        <FiPlayCircle size={13} />
                        Booking demo
                      </button>
                    </div>
                  </div>
                ))}

              {!isLoading && filteredPartners.length === 0 && (
                <div className="empty-state partners-grid-empty">
                  <div className="empty-state-icon">
                    <span className="hostaway-h-badge lg">H</span>
                  </div>
                  <h3 className="empty-state-title">
                    {searchRaw
                      ? "No partners match your search"
                      : "No Hostaway partners onboarded yet"}
                  </h3>
                  <p className="empty-state-hint">
                    {searchRaw
                      ? "Try clearing the search to see everyone."
                      : "Click Connect Hostaway partner above to onboard one."}
                  </p>
                  {searchRaw && (
                    <button
                      type="button"
                      className="empty-state-action"
                      onClick={() => setSearchRaw("")}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
          <div className="partners-table-scroll">
            <table className={`partners-table hostaway-table ${viewMode === "table" ? "partners-table--compact" : ""}`}>
              <thead>
                <tr>
                  <th style={{ width: 44 }}>#</th>
                  <th>Account ID</th>
                  <th>VT Partner</th>
                  <th>Timezone</th>
                  <th style={{ width: 80 }}>Webhook</th>
                  <th>Last Sync</th>
                  <th>Status</th>
                  <th>Onboarded</th>
                  <th style={{ width: 250 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      <td className="serial" data-label="#">
                        <span className="skeleton-block" style={{ width: 22 }} />
                      </td>
                      <td data-label="Account ID">
                        <span className="skeleton-block" style={{ width: 140 }} />
                      </td>
                      <td data-label="VT Partner">
                        <span className="skeleton-block" style={{ width: 140 }} />
                      </td>
                      <td data-label="Timezone">
                        <span className="skeleton-block" style={{ width: 90 }} />
                      </td>
                      <td data-label="Webhook">
                        <span className="skeleton-block" style={{ width: 20 }} />
                      </td>
                      <td data-label="Last Sync">
                        <span className="skeleton-block" style={{ width: 120 }} />
                      </td>
                      <td data-label="Status">
                        <span className="skeleton-block" style={{ width: 80 }} />
                      </td>
                      <td data-label="Onboarded">
                        <span className="skeleton-block" style={{ width: 80 }} />
                      </td>
                      <td data-label="Actions">
                        <span className="skeleton-block" style={{ width: 180 }} />
                      </td>
                    </tr>
                  ))}

                {!isLoading &&
                  filteredPartners.map((p, idx) => (
                    <tr key={p.accountId}>
                      <td className="serial" data-label="#">
                        {idx + 1}
                      </td>
                      <td
                        className="pm-name hostaway-clickable"
                        data-label="Account ID"
                        onClick={() => onViewListings(p)}
                        title="View listings"
                      >
                        {p.accountId}
                      </td>
                      <td data-label="VT Partner">
                        {p.vtAccountId || <span className="muted">—</span>}
                      </td>
                      <td data-label="Timezone">
                        {p.timezone || <span className="muted">—</span>}
                      </td>
                      <td data-label="Webhook">
                        {p.webhookId ? (
                          <span className="hostaway-status hostaway-status--ok" title="Webhook registered">
                            <span className="dot" /> Yes
                          </span>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                      <td data-label="Last Sync">
                        {p.lastSyncAt ? (
                          new Date(p.lastSyncAt).toLocaleString()
                        ) : (
                          <span className="muted">Never</span>
                        )}
                      </td>
                      <td data-label="Status">
                        <SyncStatus status={p.lastSyncStatus} lastSyncAt={p.lastSyncAt} />
                      </td>
                      <td data-label="Onboarded" className="onboarded">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td data-label="Actions" className="actions-cell">
                        <button
                          className="hostaway-action-btn primary"
                          disabled={syncingId === p.accountId}
                          onClick={() => onSyncNow(p.accountId)}
                          title="Trigger a sync now"
                        >
                          <FiRefreshCw
                            size={13}
                            className={syncingId === p.accountId ? "spinning" : ""}
                          />
                          {syncingId === p.accountId ? "Syncing…" : "Sync now"}
                        </button>
                        <button
                          className="hostaway-action-btn outline"
                          onClick={() => setShowBookingDemo(p)}
                          title="Run the booking demo"
                        >
                          <FiPlayCircle size={13} />
                          Booking demo
                        </button>
                        <button
                          className="hostaway-action-btn icon-only"
                          onClick={() => onViewListings(p)}
                          title="View listings"
                          aria-label="View listings"
                        >
                          <FiChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}

                {!isLoading && filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: 0 }}>
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <span className="hostaway-h-badge lg">H</span>
                        </div>
                        <h3 className="empty-state-title">
                          {searchRaw
                            ? "No partners match your search"
                            : "No Hostaway partners onboarded yet"}
                        </h3>
                        <p className="empty-state-hint">
                          {searchRaw
                            ? "Try clearing the search to see everyone."
                            : "Click Connect Hostaway partner above to onboard one."}
                        </p>
                        {searchRaw && (
                          <button
                            type="button"
                            className="empty-state-action"
                            onClick={() => setSearchRaw("")}
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>

      {/* Connect modal — unchanged from the legacy page */}
      {showConnect && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: "50px",
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" style={{ fontSize: "22px", padding: "10px 0 10px 15px" }}>
                  Connect Hostaway Partner
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => onConnectClosed(false)}
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "#212121",
                    background: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ padding: 0, maxHeight: "85vh", overflowY: "auto" }}>
                <EditPartner onClose={onConnectClosed} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Demo modal — unchanged */}
      {showBookingDemo && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: "50px",
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" style={{ fontSize: "22px", padding: "10px 0 10px 15px" }}>
                  Booking Demo — Account {showBookingDemo.accountId}
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowBookingDemo(null)}
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "#212121",
                    background: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ padding: 0, maxHeight: "85vh", overflowY: "auto" }}>
                <BookingDemo
                  partner={showBookingDemo}
                  onClose={() => setShowBookingDemo(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PartnersHostawayV2;
