// ---------------------------------------------------------------------------
// EPS Reservations — admin view of reservations arriving through the
// External Partner API (SHub /eps/get-all-reservations).
//
// Redesigned 2026-08 to the shared modern list language (PartnersListView /
// /listings): page-hero + toolbar + card table with status pills, skeletons,
// empty state. Behaviour preserved from the legacy page:
//   * pending  status click  → Approve / Decline dialog
//   * approved status click  → Cancel dialog
//   * Approve  = PUT SHub /reserve/<propertyId>?reservation_request_from=eps
//                then eps_reservations status update on VTHub
//   * Decline  = AuthService.declineReservation
//   * Cancel   = PUT SHub /reserve-cancel/<propertyId> then status update
//   * property id links to login.villatracker.com/property/<id>
// Server paging unchanged (limit/skip, sortBy startDate:desc). The status
// chips and text filter are client-side over the loaded page.
// ---------------------------------------------------------------------------

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import dayjs from "dayjs";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";

import Layout from "../../components/Layout";
import Popup from "../../components/Popup/index.js";
import Button from "../../components/Buttons/Button/Button";
import Paging from "../../components/Paging";
import LoadingBox from "../../components/LoadingBox";
import AuthService from "../../services/auth.service";
import constants from "../../Util/constants";

import "../PartnersListView/PartnersListView.scss";
import "./EListings.scss";

const STATUS_CHIPS = [
    { key: "", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "declined", label: "Declined" },
    { key: "cancelled", label: "Cancelled" },
];

const statusPillVariant = (status) => {
    switch (String(status || "").toLowerCase()) {
        case "approved": return "approved";
        case "pending": return "pending";
        case "declined":
        case "cancelled": return "declined";
        default: return "total";
    }
};

const EPartnerReservationsProperties = (props) => {
    const { agent, agency, token, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [totalReservation, setTotalReservation] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    // Client-side filters over the loaded page.
    const [statusFilter, setStatusFilter] = useState("");
    const [searchRaw, setSearchRaw] = useState("");
    const [search, setSearch] = useState("");
    const searchDebounceRef = useRef(null);

    // Approve/Decline + Cancel dialogs.
    const [selectedReservations, setSelectedReservations] = useState(null);
    const [onCancelReservation, setOnCancelReservation] = useState(false);

    const agentData = JSON.parse(localStorage.getItem("agent"));

    const userRequest = axios.create({
        headers: { "x-api-key": constants.X_API_KEY },
    });

    const pagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE;
    const pagingTo = useMemo(() => {
        const cap = pagingFrom + constants.PAGING_LISTING_SIZE - 1;
        return totalReservation && cap > totalReservation ? totalReservation : cap;
    }, [pagingFrom, totalReservation]);

    const totalPages = useMemo(() => {
        if (!totalReservation) return 1;
        return Math.max(1, Math.ceil(totalReservation / constants.PAGING_LISTING_SIZE));
    }, [totalReservation]);

    const getAllListings = async (page = pageNumber) => {
        const params = {
            limit: constants.PAGING_LISTING_SIZE,
            skip: page * constants.PAGING_LISTING_SIZE,
            sortBy: "startDate:desc",
        };
        const queryString = Object.keys(params).map((key) => key + "=" + params[key]).join("&");
        const shubSearch = constants.SHUB_URL + "/eps/get-all-reservations?";
        setIsLoading(true);
        userRequest
            .get(`${shubSearch}${queryString}`)
            .then((response) => {
                setIsLoading(false);
                if (!response) return;
                if (response?.data?.error) {
                    swal({ show: true, icon: "error", title: "Oops!!", text: response?.data?.error });
                    return;
                }
                setTotalReservation(response?.data?.totalReservation || 0);
                setReservations(response?.data?.reservations || []);
            })
            .catch(() => {
                setIsLoading(false);
                swal({ show: true, icon: "error", title: "Opps!!", text: "No Data Found" });
            });
    };

    useEffect(() => {
        getAllListings(pageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => setSearch(searchRaw.trim().toLowerCase()), 250);
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, [searchRaw]);

    const onChangePage = (nextPage) => {
        setPageNumber(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ------------------------------------------------------------------
    // Status-change dialogs (behaviour unchanged)
    // ------------------------------------------------------------------
    const changeReservationStatus = (status, reservation) => {
        setSelectedReservations(reservation);
    };

    const cancelReservation = (status, reservation) => {
        setOnCancelReservation(true);
        setSelectedReservations(reservation);
    };

    const onCloseResStatus = () => {
        setOnCancelReservation(false);
        setSelectedReservations(null);
    };

    // Copied from VT-Front\src\pages\Reservations\EditReservation\index.js
    const handleResConfirmation = async (reservationData) => {
        const reservationUniqueID = `EPS-VT_${reservationData?.reservationID}`; //LIVE

        let data = JSON.stringify({
            client: {
                firstName: reservationData?.guestFirstName,
                lastName: reservationData?.guestLastName,
                phone: reservationData?.guestPhoneNumbers,
                email: reservationData?.guestEmail,
            },
            dateFrom: dayjs(reservationData?.startDate).format("MM.DD.YYYY"),
            dateTo: dayjs(reservationData?.endDate).format("MM.DD.YYYY"),
            currency: reservationData?.currency,
            numberOfGuests: reservationData.numberOfGuests,
            adults: reservationData?.adults,
            children: reservationData?.children,
            resChannel: "VT",
            reservationId: reservationUniqueID,
            ResStatus: "Commit",
        });

        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: constants.SHUB_URL + "/reserve/" + reservationData?.propertyId + "?reservation_request_from=eps",
            headers: {
                Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjY4YmMwNzA0NjBjMGU1NGYxOWU3NjVjIiwiYXBwbGljYXRpb25JZCI6IjY0NDkxMWJlMjEwN2Q3MDAyMWZmZGM4MSIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE3MjA0MzQ4MDB9.OyVIohRJRwoYGENJY0NtVV65ouxh5iHBSkDSSbs-VFI", //Villa Tracker
                "Account-Id": "640625ea0620e40031b8597d",
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then(async (response) => {
                console.log("RESPONSE DATA:::", response.data);
                if (response.data.success) {
                    //update VTHUB db status,agent,reservationUniqueID in collection eps_reservations
                    const response2 = await AuthService.updateReservationStatus(
                        reservationData,
                        "approved",
                        agentData.firstName,
                        reservationUniqueID
                    );
                    if (response2.success) {
                        swal({
                            show: true,
                            title: "Success",
                            text: "Reservation is approved! " + response2.message + " (RESERVATION ID : " + reservationUniqueID + ")",
                            icon: "success",
                        });
                        onCloseResStatus();
                        getAllListings();
                    } else {
                        swal({ show: true, title: "Error", text: response2.message, icon: "error" });
                    }
                } else {
                    swal({
                        show: true,
                        title: "Error",
                        text: "Reservation failed! " + response.data.message,
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                console.log("error RES:", error);
            });
    };

    const handleResDecline = async (reservationData) => {
        const response = await AuthService.declineReservation(reservationData, "declined", agentData.firstName);
        if (response.success) {
            swal({
                show: true,
                title: "Success",
                text: "Reservation has been declined! " + response.message,
                icon: "success",
            });
            onCloseResStatus();
            getAllListings();
        } else {
            swal({ show: true, title: "Error", text: response.message, icon: "error" });
        }
    };

    const handleResCancellation = async (reservationData) => {
        if (!window.confirm("Are you sure you want to cancel this reservation? " + reservationData.reservationUniqueID)) {
            return;
        }

        const reservationUniqueID = reservationData?.reservationUniqueID;
        if (!reservationUniqueID) {
            swal({ show: true, title: "Error", text: "reservationUniqueID can not be empty!", icon: "error" });
            return false;
        }

        let data = JSON.stringify({
            client: {
                firstName: reservationData?.guestFirstName,
                lastName: reservationData?.guestLastName,
                phone: reservationData?.guestPhoneNumbers,
                email: reservationData?.guestEmail,
            },
            dateFrom: dayjs(reservationData?.startDate).format("MM.DD.YYYY"),
            dateTo: dayjs(reservationData?.endDate).format("MM.DD.YYYY"),
            currency: reservationData?.currency,
            numberOfGuests: reservationData.numberOfGuests,
            adults: reservationData?.adults,
            children: reservationData?.children,
            resChannel: "VT",
            reservationId: reservationUniqueID,
            ResStatus: "Cancel",
        });

        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: constants.SHUB_URL + "/reserve-cancel/" + reservationData?.propertyId + "?reservation_request_from=eps",
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjY4YmMwNzA0NjBjMGU1NGYxOWU3NjVjIiwiYXBwbGljYXRpb25JZCI6IjY0NDkxMWJlMjEwN2Q3MDAyMWZmZGM4MSIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE3MjA0MzQ4MDB9.OyVIohRJRwoYGENJY0NtVV65ouxh5iHBSkDSSbs-VFI", //Villa Tracker
                "Account-Id": "640625ea0620e40031b8597d",
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then(async (response) => {
                console.log("RESPONSE DATA:::", response.data);
                if (response.data.success) {
                    //update VTHUB db status,agent,reservationUniqueID in collection eps_reservations
                    const response2 = await AuthService.updateReservationStatus(
                        reservationData,
                        "cancelled",
                        agentData.firstName,
                        reservationUniqueID
                    );
                    if (response2.success) {
                        swal({
                            show: true,
                            title: "Success",
                            text: "Cancellation is done! " + response2.message + " (RESERVATION ID : " + reservationUniqueID + ")",
                            icon: "success",
                        });
                        onCloseResStatus();
                        getAllListings();
                    } else {
                        swal({ show: true, title: "Error", text: response2.message, icon: "error" });
                    }
                } else {
                    swal({ show: true, title: "Error", text: "Cancellation failed!", icon: "error" });
                }
            })
            .catch((error) => {
                console.log("error RES:", error);
            });
    };

    // ------------------------------------------------------------------
    // Client-side filtering over the loaded page
    // ------------------------------------------------------------------
    const visibleReservations = useMemo(() => {
        return reservations.filter((r) => {
            if (statusFilter && String(r.status || "").toLowerCase() !== statusFilter) return false;
            if (search) {
                const haystack = [
                    r.partnerName,
                    r.propertyName,
                    r.propertyId,
                    r.guestEmail,
                    r.guestFirstName,
                    r.guestLastName,
                    r.reservationUniqueID,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(search)) return false;
            }
            return true;
        });
    }, [reservations, statusFilter, search]);

    const hasActiveFilters = !!(search || statusFilter);
    const showEmpty = !isLoading && visibleReservations.length === 0;
    const serialBase = pageNumber * constants.PAGING_LISTING_SIZE;

    const onStatusClick = (r) => {
        const status = String(r.status || "").toLowerCase();
        if (status === "pending") changeReservationStatus(r.guestBookingStatus, r);
        else if (status === "approved") cancelReservation(r.guestBookingStatus, r);
    };

    return (
        <Layout
            pageTitle="EPS Reservations"
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        >
            <div className="partners-view eps-reservations-view">
                <LoadingBox visible={isLoading} />

                {/* Hero */}
                <div className="page-hero">
                    <div className="page-hero-left">
                        <div className="page-hero-icon">
                            <FiCalendar size={22} />
                        </div>
                        <div>
                            <h1 className="page-hero-title">EPS Reservations</h1>
                            <p className="page-hero-subhead">
                                Reservations arriving via the External Partner API — approve, decline or cancel
                            </p>
                        </div>
                    </div>
                    <div className="page-hero-meta">
                        <span className="page-hero-pill">
                            {totalReservation
                                ? `${totalReservation} reservation${totalReservation === 1 ? "" : "s"}`
                                : "— reservations"}
                        </span>
                        <div className="page-hero-pager" role="group" aria-label="Pagination">
                            <button
                                type="button"
                                className="page-hero-pager-btn"
                                onClick={() => onChangePage(Math.max(0, pageNumber - 1))}
                                disabled={pageNumber <= 0}
                                aria-label="Previous page"
                                title="Previous page"
                            >
                                <FiChevronLeft size={16} />
                            </button>
                            <span className="page-hero-pager-label">
                                Page {pageNumber + 1} of {totalPages}
                            </span>
                            <button
                                type="button"
                                className="page-hero-pager-btn"
                                onClick={() => onChangePage(Math.min(totalPages - 1, pageNumber + 1))}
                                disabled={pageNumber >= totalPages - 1}
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
                            placeholder="Filter by partner, property, guest…"
                            value={searchRaw}
                            onChange={(e) => setSearchRaw(e.target.value)}
                            aria-label="Filter reservations"
                        />
                        {searchRaw && (
                            <button
                                type="button"
                                className="search-clear"
                                onClick={() => setSearchRaw("")}
                                aria-label="Clear filter"
                                title="Clear filter"
                            >
                                <IoMdClose size={16} />
                            </button>
                        )}
                    </div>

                    <div className="sort-wrap">
                        <span className="sort-wrap-label">Status</span>
                        <div className="sort-chips" role="tablist" aria-label="Filter reservations by status">
                            {STATUS_CHIPS.map((opt) => (
                                <button
                                    key={opt.key || "all"}
                                    type="button"
                                    role="tab"
                                    aria-selected={statusFilter === opt.key}
                                    className={statusFilter === opt.key ? "active" : ""}
                                    onClick={() => setStatusFilter(opt.key)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Approve / Decline dialog (pending reservations) */}
                {selectedReservations && !onCancelReservation && (
                    <Popup>
                        <div className="approve-agent-container">
                            <div className="approve-agent-header">
                                <div className="approve-agent-title">Approving by Admin:</div>
                                <div className="approve-agent-sub-header">
                                    <div>
                                        Main Agent : <b>{agentData.firstName}</b>
                                    </div>
                                    <div className="approve-agent-sub-header-separator" />
                                    <div>
                                        Agency: <b>{agentData.agencyName}</b>
                                    </div>
                                </div>
                            </div>

                            <div className="approve-agent-main">
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type="button"
                                            className="btn btn-primary"
                                            value="Approve Reservation"
                                            onClick={() => handleResConfirmation(selectedReservations)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="button"
                                            className="btn btn-danger"
                                            value="Decline Reservation"
                                            onClick={() => handleResDecline(selectedReservations)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="approve-agent-footer">
                                <Button
                                    style={{ fontSize: "18px", marginRight: "30px" }}
                                    variant="link"
                                    text="Cancel"
                                    onClick={onCloseResStatus}
                                />
                            </div>
                        </div>
                    </Popup>
                )}

                {/* Cancel dialog (approved reservations) */}
                {onCancelReservation && selectedReservations && (
                    <Popup>
                        <div className="approve-agent-container">
                            <div className="approve-agent-header">
                                <div className="approve-agent-title">Cancelling Reservation by Admin:</div>
                                <div className="approve-agent-sub-header">
                                    <div>
                                        Main Agent : <b>{agentData.firstName}</b>
                                    </div>
                                    <div className="approve-agent-sub-header-separator" />
                                    <div>
                                        Agency: <b>{agentData.agencyName}</b>
                                    </div>
                                </div>
                            </div>

                            <div className="approve-agent-main">
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            type="button"
                                            className="btn btn-danger"
                                            value="Cancel Reservation"
                                            onClick={() => handleResCancellation(selectedReservations)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="approve-agent-footer">
                                <Button
                                    style={{ fontSize: "18px", marginRight: "30px" }}
                                    variant="link"
                                    text="Cancel"
                                    onClick={onCloseResStatus}
                                />
                            </div>
                        </div>
                    </Popup>
                )}

                {/* Table card */}
                <div className="partners-card">
                    <div className="partners-table-scroll">
                        <table className="partners-table eps-reservations-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 44 }}>#</th>
                                    <th>Partner</th>
                                    <th>Property</th>
                                    <th style={{ width: 110 }}>Property ID</th>
                                    <th style={{ width: 110 }}>Check-in</th>
                                    <th style={{ width: 110 }}>Check-out</th>
                                    <th style={{ width: 80 }}>Currency</th>
                                    <th>Guest</th>
                                    <th style={{ width: 110 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading &&
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <tr key={`skeleton-${i}`}>
                                            <td className="serial">
                                                <span className="skeleton-block" style={{ width: 22 }} />
                                            </td>
                                            {[0, 1, 2, 3, 4, 5, 6].map((k) => (
                                                <td key={k}>
                                                    <span className="skeleton-block" style={{ width: 100 }} />
                                                </td>
                                            ))}
                                            <td>
                                                <span className="skeleton-pill" />
                                            </td>
                                        </tr>
                                    ))}

                                {!isLoading &&
                                    visibleReservations.map((item, index) => {
                                        const status = String(item.status || "").toLowerCase();
                                        const clickable = status === "pending" || status === "approved";
                                        return (
                                            <tr key={item.reservationID || `res-${index}`}>
                                                <td className="serial" data-label="#">
                                                    {serialBase + index + 1}
                                                </td>
                                                <td className="pm-name" data-label="Partner" title={item.partnerName || ""}>
                                                    {item.partnerName || "—"}
                                                </td>
                                                <td className="pm-name" data-label="Property" title={item.propertyName || ""}>
                                                    {item.propertyName || "—"}
                                                </td>
                                                <td className="account-id" data-label="Property ID">
                                                    {item.propertyId ? (
                                                        <a
                                                            className="eps-property-link"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            href={`https://login.villatracker.com/property/${item.propertyId}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="Open property"
                                                        >
                                                            {item.propertyId}
                                                            <FiExternalLink size={12} />
                                                        </a>
                                                    ) : (
                                                        "—"
                                                    )}
                                                </td>
                                                <td className="onboarded" data-label="Check-in">
                                                    {item.startDate ? String(item.startDate).slice(0, 10) : "—"}
                                                </td>
                                                <td className="onboarded" data-label="Check-out">
                                                    {item.endDate ? String(item.endDate).slice(0, 10) : "—"}
                                                </td>
                                                <td data-label="Currency">{item.currency || "—"}</td>
                                                <td className="eps-guest" data-label="Guest" title={item.guestEmail || ""}>
                                                    <div className="eps-guest-name">
                                                        {[item.guestFirstName, item.guestLastName].filter(Boolean).join(" ") || "—"}
                                                    </div>
                                                    <div className="eps-guest-email">{item.guestEmail || ""}</div>
                                                </td>
                                                <td data-label="Status">
                                                    <span
                                                        className={`status-pill ${statusPillVariant(item.status)} ${clickable ? "eps-status-clickable" : ""}`}
                                                        title={
                                                            status === "pending"
                                                                ? "Approve or decline this reservation"
                                                                : status === "approved"
                                                                    ? "Cancel this reservation"
                                                                    : ""
                                                        }
                                                        onClick={() => clickable && onStatusClick(item)}
                                                    >
                                                        {item.status || "—"}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                {showEmpty && (
                                    <tr>
                                        <td colSpan={9} style={{ padding: 0 }}>
                                            <div className="empty-state">
                                                <div className="empty-state-icon">
                                                    <FiCalendar />
                                                </div>
                                                <h3 className="empty-state-title">No reservations found</h3>
                                                <p className="empty-state-hint">
                                                    {hasActiveFilters
                                                        ? "Try clearing your filter — it only searches the current page."
                                                        : "There are no EPS reservations yet."}
                                                </p>
                                                {hasActiveFilters && (
                                                    <button
                                                        type="button"
                                                        className="empty-state-action"
                                                        onClick={() => {
                                                            setSearchRaw("");
                                                            setSearch("");
                                                            setStatusFilter("");
                                                        }}
                                                    >
                                                        Clear filters
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalReservation > 0 && (
                        <div className="partners-card-footer">
                            <Paging
                                perPage={constants.PAGING_LISTING_SIZE}
                                totalItems={totalReservation}
                                currentPage={pageNumber}
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
                                Displaying {pagingFrom}–{pagingTo} of {totalReservation}
                                {hasActiveFilters && ` (${visibleReservations.length} shown after filters)`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit, modalData }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = "";
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center" className="font-color" style={{ background: "#F2F9FC" }}>
                {modalData.title}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "500px" },
                            gap: "1.5rem",
                        }}
                    >
                        <div className="row g-3 pt-3">
                            <div className="col-md-6 px-4">
                                <div className="row mb-2">
                                    <label htmlFor="inputText4" className="form-label mb-1 ps-0">
                                        Listing Name*
                                    </label>
                                    <input type="name" className="form-control rounded-0 py-2" id="inputText4" placeholder="Enter name" />
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="inputText14" className="form-label mb-1 ps-0">
                                        Property Nick*
                                    </label>
                                    <input type="name" className="form-control rounded-0 py-2" id="inputText14" placeholder="CAE000" />
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="inputAddress" className="form-label mb-1 ps-0">
                                        Client Phone*
                                    </label>
                                    <input
                                        type="phone"
                                        className="form-control rounded-0 py-2"
                                        id="inputAddress"
                                        placeholder="+41-79-489-7021"
                                        maxLength={11}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 px-4">
                                <div className="row mb-2">
                                    <label htmlFor="inputAddress" className="form-label mb-1 ps-0">
                                        Nick Name
                                    </label>
                                    <input type="text" className="form-control rounded-0 py-2" id="inputAddress" placeholder="Smiling" />
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label mb-1 ps-0">
                                        Notes
                                    </label>
                                    <textarea className="form-control rounded-0 py-2" id="exampleFormControlTextarea1" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <button
                    type="submit"
                    className="btn btn-success border-radius-0 w-25 py-2"
                    style={{ backgroundColor: "#192C3D" }}
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default EPartnerReservationsProperties;
