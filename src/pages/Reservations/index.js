import React, { useEffect, useMemo, useState } from "react";
import AuthService from "../../services/auth.service";
import axios from "axios";
import moment from "moment/moment";
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
import constants from "../../Util/constants";
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

    const pid = typeof r?.propertyId === "string" ? r.propertyId : "";
    const isRUApiProperty = pid.startsWith("RU-") || pid.startsWith("G-");
    const isHostawayApiProperty = pid.startsWith("HW-");
    const isBookingpalProperty = pid.startsWith("BP-");
    const isApproved = String(r?.status || "").toLowerCase() === "approved";
    const wasCharged = r?.payment_type === "instant" && r?.flywireReference;

    const confirmed = window.confirm(
      wasCharged
        ? "Cancel this reservation? The guest's card WAS CHARGED for this instant booking — cancelling triggers a full refund to the guest."
        : "Cancel this reservation? It will be cancelled on the channel."
    );
    if (!confirmed) return;

    setCancelingId(reservationID);
    try {
      // 1) Cancel/decline on channel when required.
      if (isHostawayApiProperty) {
        // Hostaway: only cancel on channel if the reservation was approved.
        if (isApproved) {
          const partnerReservationID = r?.partnerReservationID;
          if (!partnerReservationID) {
            throw new Error("Missing partnerReservationID for Hostaway cancellation.");
          }
          const cancelResp = await axios.put(
            `${constants.SHUB_URL}/hostaway-cancel-reservation`,
            {
              propertyId: pid, // hub resolves accountId from this
              reservationId: Number(partnerReservationID),
              cancelledBy: "host",
            },
            { headers: { "x-api-key": constants.X_API_KEY } }
          );
          if (cancelResp?.data?.success !== true) {
            throw new Error(cancelResp?.data?.error || "Failed to cancel reservation on Hostaway.");
          }
        }
      } else if (isBookingpalProperty) {
        // BookingPal: only cancel on channel if approved (the BP-side
        // reservation + calendar block exist then). Same controller
        // (cancelReservation) VT-FE's /bookingpal-cancel-reservation uses —
        // cancels on channel, marks stored rows cancelled, frees the calendar.
        if (isApproved) {
          if (!r?.bpConfirmationCode) {
            throw new Error("Missing BookingPal confirmation code for cancellation.");
          }
          const cancelResp = await AuthService.bpCancelReservation({
            confirmation_code: String(r.bpConfirmationCode),
            confirmation_id: r?.bpConfirmationId ? String(r.bpConfirmationId) : "",
          });
          const cancelData = cancelResp?.data;
          if (cancelData && cancelData.success === false) {
            throw new Error(cancelData?.error || "Failed to cancel reservation on BookingPal.");
          }
        }
      } else if (isRUApiProperty) {
        // RU / group: only cancel on channel if approved.
        if (isApproved) {
          const partnerReservationID = r?.partnerReservationID;
          if (!partnerReservationID) {
            throw new Error("Missing partnerReservationID for RU cancellation.");
          }
          const cancelResp = await axios.post(
            `${constants.SHUB_URL}/ru-cancelreservation`,
            {
              partnerReservationID: String(partnerReservationID),
              reservationId: String(partnerReservationID),
            },
            { headers: { "x-api-key": constants.X_API_KEY } }
          );
          const cancelData = cancelResp?.data;
          const cancelOk = cancelData?.status === true || cancelData?.success === true;
          if (!cancelOk) {
            throw new Error(cancelData?.message || "Failed to cancel reservation on RU channel.");
          }
        }
      } else {
        // Legacy channel (Guesty / direct) — mirrors VT-FE's /reserve-cancel.
        const body = JSON.stringify({
          client: {
            firstName: r?.guestFirstName,
            lastName: r?.guestLastName,
            phone: r?.guestPhoneNumbers,
            email: r?.guestEmail,
          },
          dateFrom: moment(r?.startDate).format("MM.DD.YYYY"),
          dateTo: moment(r?.endDate).format("MM.DD.YYYY"),
          currency: r?.currency,
          adults: r?.adults,
          children: r?.children,
          resChannel: "VT",
          reservationId: "Villatracker_" + r?.reservationID,
          ResStatus: "Cancel",
        });
        const channelResp = await axios.request({
          method: "put",
          maxBodyLength: Infinity,
          url: constants.SHUB_URL + "/reserve-cancel/" + r?.propertyId,
          headers: {
            Authorization:
              "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c",
            "Account-Id": "640625ea0620e40031b8597d",
            "Content-Type": "application/json",
          },
          data: body,
        });
        if (!channelResp?.data?.success) {
          throw new Error(channelResp?.data?.error || "Failed to cancel reservation on channel!");
        }
      }

      // 2) Decline the reservation-of-record — the backend releases/refunds the
      //    Flywire payment as part of this call and reports the outcome back.
      const responseUpdate = await AuthService.bpDeclineReservation(
        reservationID,
        "declined"
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
