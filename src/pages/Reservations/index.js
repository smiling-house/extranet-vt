import React, { useEffect, useMemo, useState } from "react";
import AuthService from "../../services/auth.service";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiGrid,
  FiColumns,
} from "react-icons/fi";
import { IoIosSearch, IoMdClose } from "react-icons/io";

import Layout from "../../components/Layout/index.js";
import Paging from "../../components/Paging";
// Reuse the PMS pages' design system (hero / toolbar / view-switcher / table /
// grid / pills / paging), then a few reservation-specific overrides.
import "../PartnersListView/PartnersListView.scss";
import "./Reservations.scss";

// What the backend did about the guest's money when cancelling — surfaced to
// the agent. Mirrors VT-FE's FLYWIRE_ACTION_MESSAGES so the extranet reports
// the refund/hold outcome exactly like VT-FE does.
const FLYWIRE_ACTION_MESSAGES = {
  hold_released: "The guest's card authorization hold was released.",
  cancel_failed:
    "The pre-auth hold could NOT be released automatically — admins were emailed to release it in the Flywire dashboard (it auto-expires after 7 days regardless).",
  refunded: "A full refund was issued to the guest's card automatically.",
  refund_manual_required:
    "REFUND REQUIRED: the guest's card was charged — admins were emailed to issue the refund in the Flywire dashboard.",
  refund_failed:
    "Automatic refund FAILED — admins were emailed to refund manually in the Flywire dashboard.",
  captured_partial:
    "Cancellation policy applied: the retained penalty was captured; the remainder of the hold is released.",
  captured_full:
    "Cancellation policy: the full amount was captured (non-refundable / stricter partner terms).",
  retained_full:
    "Cancellation policy: non-refundable — no refund; the charged amount is retained.",
  partial_refunded:
    "Cancellation policy: a partial refund was issued to the guest's card automatically.",
  partial_manual_required:
    "Cancellation policy: a PARTIAL refund is required — admins were emailed the exact amount to refund in the Flywire dashboard.",
  error:
    "Payment handling errored — check with the admins that the charge/hold was resolved.",
};

// Map a reservation status onto a status-pill color variant.
const statusVariant = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "approved" || s === "confirmed") return "approved";
  if (s === "pending") return "pending";
  if (["declined", "cancelled", "canceled_by_agent", "failed", "expired"].includes(s)) {
    return "declined";
  }
  return "total";
};

// Only offer Cancel for live reservations (not already declined/cancelled).
const isCancellable = (status) => {
  const st = String(status || "").toLowerCase();
  return st === "approved" || st === "pending" || st === "confirmed";
};

// ISO strings → YYYY-MM-DD; leave short forms (DD.MM.YYYY) as-is.
const fmtDate = (v) => {
  if (!v) return "-";
  const s = String(v);
  return s.includes("T") ? s.slice(0, 10) : s;
};

// Status filter chips — the reservations analog of the PMS "Sort by" row. Keys
// are statusVariant() values so filtering is a single equality check.
const STATUS_FILTERS = [
  { key: "", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "pending", label: "Pending" },
  { key: "declined", label: "Declined" },
];

// View modes — same keys/icons as /listings and the PMS pages.
const VIEW_MODES = [
  { key: "rows", label: "Rows", Icon: FiList },
  { key: "grid", label: "Grid", Icon: FiGrid },
  { key: "table", label: "Table", Icon: FiColumns },
];
const VIEW_MODE_LS_KEY = "reservations_view_mode";
const RES_PAGE_SIZE = 12;

const clientName = (r) =>
  r?.name ||
  [r?.guestFirstName, r?.guestLastName].filter(Boolean).join(" ") ||
  (r?.client_id != null ? String(r.client_id) : "-");

const Reservations = (props) => {
  const {
    token,
    agency,
    agent,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [cancelingId, setCancelingId] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem(VIEW_MODE_LS_KEY);
    return VIEW_MODES.some((m) => m.key === saved) ? saved : "rows";
  });

  const loadReservations = () => {
    setIsLoading(true);
    AuthService.GetReservation("")
      .then((response) => {
        setData(Array.isArray(response?.reservations) ? response.reservations : []);
      })
      .catch((e) => {
        console.log(e);
        setData([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Client-side filter (the backend get-reservations ignores query params).
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((r) => {
      if (statusFilter && statusVariant(r?.status) !== statusFilter) return false;
      if (!q) return true;
      return (
        String(r?.reservationID || "").toLowerCase().includes(q) ||
        String(r?.agencyName || "").toLowerCase().includes(q) ||
        String(clientName(r)).toLowerCase().includes(q) ||
        String(r?.propertyId || "").toLowerCase().includes(q)
      );
    });
  }, [data, search, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / RES_PAGE_SIZE));
  const safePage = Math.min(pageNumber, totalPages - 1);
  const pageRows = useMemo(
    () => filtered.slice(safePage * RES_PAGE_SIZE, safePage * RES_PAGE_SIZE + RES_PAGE_SIZE),
    [filtered, safePage]
  );
  const pagingFrom = totalItems ? safePage * RES_PAGE_SIZE + 1 : 0;
  const pagingTo = Math.min((safePage + 1) * RES_PAGE_SIZE, totalItems);
  const showEmpty = !isLoading && totalItems === 0;
  const hasActiveFilters = !!(search || statusFilter);

  const changeViewMode = (next) => {
    setViewMode(next);
    try {
      localStorage.setItem(VIEW_MODE_LS_KEY, next);
    } catch (_) {}
  };
  const onChangePage = (next) => {
    setPageNumber(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onSearch = (v) => {
    setSearch(v);
    setPageNumber(0);
  };
  const onStatus = (key) => {
    setStatusFilter(key);
    setPageNumber(0);
  };
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPageNumber(0);
  };

  // Cancel a reservation of ANY PMS source, mirroring VT-FE's
  // declineSingleReservation: cancel on the correct channel first (HW / BP /
  // RU-G / legacy), THEN decline the reservation-of-record (which runs the
  // Flywire refund/hold-release). A channel failure THROWS — never leave the
  // record declined while the channel stays booked.
  const onCancelReservation = async (iteam) => {
    const r = iteam;
    const reservationID = r?.reservationID;
    if (!reservationID) return;

    const isApproved = String(r?.status || "").toLowerCase() === "approved";
    const wasCharged = r?.payment_type === "instant" && r?.flywireReference;

    const confirmed = window.confirm(
      wasCharged
        ? "Cancel this reservation? The guest's card WAS CHARGED for this instant booking."
        : "Cancel this reservation? It will be cancelled on the channel."
    );
    if (!confirmed) return;

    // Who is cancelling drives the refund overlay: a GUEST cancellation applies
    // the 30-day/50% cancellation policy (a penalty may be retained); a
    // HOST/property decline is a full refund. (window.confirm: OK = guest.)
    let cancelledBy = "host";
    if (r?.flywireReference) {
      cancelledBy = window.confirm(
        "Is this a GUEST cancellation?\n\nOK = Guest cancellation (cancellation policy applies — a penalty may be retained).\nCancel = Host / property decline (full refund)."
      ) ? "guest" : "host";
    }

    setCancelingId(reservationID);
    try {
      // 1) Cancel on the channel via the unified endpoint — the hub finds the
      //    reservation by its channelReservationId (= bpConfirmationId) and
      //    dispatches the per-PM cancel (idempotent). A channel failure THROWS,
      //    so the record is never declined while the channel stays booked.
      //    Pending declines skip this (no channel booking yet).
      if (isApproved && r?.bpConfirmationId) {
        try {
          await AuthService.cancelBooking(String(r.bpConfirmationId));
        } catch (e) {
          if (e?.response?.status === 404) {
            throw new Error("This reservation predates the unified booking system and can't be cancelled automatically — cancel it directly on the PM portal, then it can be marked declined.");
          }
          const d = e?.response?.data;
          throw new Error(d?.detail ? `Channel rejected the cancellation: ${typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail)}` : (d?.error || e?.message || 'Failed to cancel the reservation on the channel'));
        }
      }

      // 2) Decline the reservation-of-record — the backend releases/refunds the
      //    Flywire payment as part of this call and reports the outcome back.
      const responseUpdate = await AuthService.bpDeclineReservation(
        reservationID,
        "declined",
        { cancelledBy }
      );
      if (!responseUpdate?.success) {
        throw new Error("Failed to cancel reservation.");
      }
      const actionMsg = FLYWIRE_ACTION_MESSAGES[responseUpdate?.flywireAction];
      window.alert(
        actionMsg ? `Reservation cancelled. ${actionMsg}` : "Reservation cancelled."
      );
      loadReservations();
    } catch (err) {
      console.log("cancel error:", err);
      window.alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to cancel reservation."
      );
    } finally {
      setCancelingId(null);
    }
  };

  const cancelButton = (iteam) =>
    isCancellable(iteam.status) ? (
      <button
        type="button"
        className="res-cancel-btn"
        disabled={cancelingId === iteam.reservationID}
        onClick={() => onCancelReservation(iteam)}
      >
        {cancelingId === iteam.reservationID ? "Cancelling…" : "Cancel"}
      </button>
    ) : (
      <span className="res-action-empty">—</span>
    );

  const emptyState = (
    <div className="empty-state">
      <div className="empty-state-icon">
        <FiCalendar />
      </div>
      <h3 className="empty-state-title">No reservations found</h3>
      <p className="empty-state-hint">
        {hasActiveFilters
          ? "Try clearing your search or status filter."
          : "There are no reservations yet."}
      </p>
      {hasActiveFilters && (
        <button type="button" className="empty-state-action" onClick={resetFilters}>
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <Layout
      pageTitle="Reservations"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="partners-view reservations-view">
        {/* Hero */}
        <div className="page-hero">
          <div className="page-hero-left">
            <div className="page-hero-icon">
              <FiCalendar size={22} />
            </div>
            <div>
              <h1 className="page-hero-title">Reservations</h1>
              <p className="page-hero-subhead">
                Bookings across all channels — cancel to release the channel and
                refund the guest
              </p>
            </div>
          </div>
          <div className="page-hero-meta">
            <span className="page-hero-pill">
              {totalItems
                ? `${totalItems} reservation${totalItems === 1 ? "" : "s"}`
                : "— reservations"}
            </span>
            <div className="page-hero-pager" role="group" aria-label="Pagination">
              <button
                type="button"
                className="page-hero-pager-btn"
                onClick={() => onChangePage(Math.max(0, safePage - 1))}
                disabled={safePage <= 0}
                aria-label="Previous page"
                title="Previous page"
              >
                <FiChevronLeft size={16} />
              </button>
              <span className="page-hero-pager-label">
                Page {safePage + 1} of {totalPages}
              </span>
              <button
                type="button"
                className="page-hero-pager-btn"
                onClick={() => onChangePage(Math.min(totalPages - 1, safePage + 1))}
                disabled={safePage >= totalPages - 1}
                aria-label="Next page"
                title="Next page"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search reservation ID, guest, or agency…"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search reservations"
            />
            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => onSearch("")}
                aria-label="Clear search"
                title="Clear search"
              >
                <IoMdClose size={16} />
              </button>
            )}
          </div>

          <div className="sort-wrap">
            <span className="sort-wrap-label">Status</span>
            <div className="sort-chips" role="tablist" aria-label="Filter reservations by status">
              {STATUS_FILTERS.map((opt) => (
                <button
                  key={opt.key || "all"}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === opt.key}
                  className={statusFilter === opt.key ? "active" : ""}
                  onClick={() => onStatus(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

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
            /* -------- GRID -------- */
            <div className="partners-grid">
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div className="partner-card is-skeleton" key={`skel-card-${i}`}>
                    <span className="skeleton-block" style={{ width: 120, height: 18 }} />
                    <span className="skeleton-block" style={{ width: 180, height: 12, marginTop: 8 }} />
                    <div className="partner-card-pills">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="skeleton-pill" />
                      ))}
                    </div>
                  </div>
                ))}

              {!isLoading &&
                pageRows.map((iteam, index) => (
                  <div className="partner-card res-card" key={iteam._id || iteam.reservationID || index}>
                    <div className="partner-card-header">
                      <span className="partner-card-serial">#{iteam.reservationID}</span>
                      <span className={`status-pill res-status ${statusVariant(iteam.status)}`}>
                        {iteam.status || "-"}
                      </span>
                    </div>
                    <h3 className="partner-card-name" title={clientName(iteam)}>
                      {clientName(iteam)}
                    </h3>
                    <div className="partner-card-accountid" title={iteam.agencyName || ""}>
                      {iteam.agencyName || "—"}
                    </div>
                    <div className="res-card-grid">
                      <div className="res-card-cell">
                        <span className="res-card-k">Arrival</span>
                        <span className="res-card-v">{fmtDate(iteam.startDate)}</span>
                      </div>
                      <div className="res-card-cell">
                        <span className="res-card-k">Nights</span>
                        <span className="res-card-v">{iteam.nights != null ? iteam.nights : "-"}</span>
                      </div>
                      <div className="res-card-cell">
                        <span className="res-card-k">Total</span>
                        <span className="res-card-v">{iteam.total != null ? iteam.total : "-"}</span>
                      </div>
                    </div>
                    <div className="partner-card-footer res-card-footer">
                      <span>Booked {fmtDate(iteam.reservationDate || iteam.bookedAt)}</span>
                      {cancelButton(iteam)}
                    </div>
                  </div>
                ))}

              {showEmpty && <div className="partners-grid-empty">{emptyState}</div>}
            </div>
          ) : (
            /* -------- ROWS (default) and TABLE (compact) -------- */
            <div className="partners-table-scroll">
              <table className={`partners-table ${viewMode === "table" ? "partners-table--compact" : ""}`}>
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>Reservation ID</th>
                    <th style={{ width: 130 }}>Reservation Date</th>
                    <th>Agency Name</th>
                    <th style={{ width: 120 }}>Status</th>
                    <th style={{ width: 110 }}>Total Price</th>
                    <th>Client</th>
                    <th style={{ width: 130 }}>Arrival Date</th>
                    <th style={{ width: 90 }}># Nights</th>
                    <th style={{ width: 120 }}>Booking Total</th>
                    <th style={{ width: 120 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={`skeleton-${i}`}>
                        {Array.from({ length: 10 }).map((__, k) => (
                          <td key={k}>
                            <span className="skeleton-block" style={{ width: 80 }} />
                          </td>
                        ))}
                      </tr>
                    ))}

                  {!isLoading &&
                    pageRows.map((iteam, index) => (
                      <tr key={iteam._id || iteam.reservationID || index}>
                        <td className="pm-name" data-label="Reservation ID">
                          {iteam.reservationID != null ? iteam.reservationID : "-"}
                        </td>
                        <td data-label="Reservation Date">
                          {fmtDate(iteam.reservationDate || iteam.bookedAt)}
                        </td>
                        <td data-label="Agency Name">{iteam.agencyName || "-"}</td>
                        <td data-label="Status">
                          <span className={`status-pill res-status ${statusVariant(iteam.status)}`}>
                            {iteam.status || "-"}
                          </span>
                        </td>
                        <td data-label="Total Price">
                          {iteam.total != null ? iteam.total : "-"}
                        </td>
                        <td data-label="Client">{clientName(iteam)}</td>
                        <td data-label="Arrival Date">{fmtDate(iteam.startDate)}</td>
                        <td data-label="# Nights">
                          {iteam.nights != null ? iteam.nights : "-"}
                        </td>
                        <td data-label="Booking Total">
                          {iteam.total != null ? iteam.total : "-"}
                        </td>
                        <td data-label="Action">{cancelButton(iteam)}</td>
                      </tr>
                    ))}

                  {showEmpty && (
                    <tr>
                      <td colSpan={10} style={{ padding: 0 }}>
                        {emptyState}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalItems > 0 && (
            <div className="partners-card-footer">
              <Paging
                perPage={RES_PAGE_SIZE}
                totalItems={totalItems}
                currentPage={safePage}
                onChangePage={onChangePage}
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.78rem",
                  color: "#6b7280",
                  marginTop: 6,
                }}
              >
                Displaying {pagingFrom}–{pagingTo} of {totalItems}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reservations;
