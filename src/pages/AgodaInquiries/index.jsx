import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import swal from "sweetalert";
import { fetchInquiries, updateInquiryStatus } from "../../services/agoda.service.js";
import { useHistory } from "react-router-dom";
import { PATH_AGODA_BOOKING } from "../../Util/constants.js";

// Agoda Booking-Hint inquiries (inbound webhook queue). Backend:
// GET /services/agoda/inquiries, PATCH /services/agoda/inquiries/:id/status.
const STATUSES = ["new", "in_progress", "confirmed", "rejected", "cancelled", "expired"];

const AgodaInquiries = (props) => {
    const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;
    const history = useHistory();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchInquiries(status ? { status } : {});
            setItems(Array.isArray(data?.items) ? data.items : []);
        } catch (e) {
            swal({ title: "Could not load inquiries", text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
            setItems([]);
        }
        setIsLoading(false);
    }, [status]);

    useEffect(() => { load(); }, [load]);

    const changeStatus = async (inq, next) => {
        setIsLoading(true);
        try {
            await updateInquiryStatus(inq._id, next);
            await load();
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Status change failed", text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
        }
    };

    const statusColor = (s) => ({
        new: "#2b6cb0", in_progress: "#a15c1a", confirmed: "#1d6f42",
        rejected: "#b02b2b", cancelled: "#666", expired: "#999",
    }[s] || "#666");

    return (
        <div className="page-container">
            <div className="page-header">VT-Extranet : Agoda Inquiries (Booking Hints)</div>
            <Sidebar agency={agency} agent={agent} screenSize={screenSize} activeMenu={activeMenu} handleToggleMenu={handleToggleMenu} />
            <div className="page-body">
                <div className="listings-container">
                    <LoadingBox visible={isLoading} />
                    <div className="listings-main">
                        <div className="row" style={{ margin: "10px 0", gap: 8, display: "flex" }}>
                            <select className="form-control" style={{ maxWidth: 200 }} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">All statuses</option>
                                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button className="btn btn-primary" onClick={load}>Refresh</button>
                            <span style={{ alignSelf: "center", color: "#555" }}>{items.length} inquiries</span>
                        </div>

                        <table className="table table-sm" style={{ fontSize: 13 }}>
                            <thead>
                                <tr>
                                    <th>Received</th><th>Booking ID</th><th>Hotel</th><th>Guest</th>
                                    <th>Stay</th><th>Guests</th><th>Total</th><th>Status</th><th>Set status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((inq) => (
                                    <tr key={inq._id} style={{ cursor: "pointer" }}
                                        onClick={() => history.push(`${PATH_AGODA_BOOKING}/${inq.agodaBookingId}`)}
                                        title="Open full booking details">
                                        <td>{inq.receivedAt ? new Date(inq.receivedAt).toLocaleString() : ""}</td>
                                        <td style={{ fontFamily: "monospace", fontSize: 12, color: "#2b6cb0", textDecoration: "underline" }}>{inq.agodaBookingId}</td>
                                        <td>{inq.hotelCode}</td>
                                        <td>
                                            <div>{inq.guestName || "—"}</div>
                                            <div style={{ color: "#888", fontSize: 11 }}>{inq.guestEmail || ""} {inq.guestPhone || ""}</div>
                                        </td>
                                        <td>
                                            {inq.checkIn ? new Date(inq.checkIn).toLocaleDateString() : "?"} → {inq.checkOut ? new Date(inq.checkOut).toLocaleDateString() : "?"}
                                            {inq.nights ? <span style={{ color: "#888" }}> ({inq.nights}n)</span> : null}
                                        </td>
                                        <td>{inq.adults || "?"}{inq.children ? ` +${inq.children}ch` : ""}</td>
                                        <td>{inq.totalAmount != null ? `${inq.totalAmount} ${inq.currency || ""}` : "—"}</td>
                                        <td><span style={{ color: "#fff", background: statusColor(inq.status), padding: "2px 8px", borderRadius: 10, fontSize: 11 }}>{inq.status}</span></td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <select className="form-control" style={{ fontSize: 12, padding: "2px 4px", width: 130 }}
                                                value={inq.status} onChange={(e) => changeStatus(inq, e.target.value)}>
                                                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 && !isLoading && (
                                    <tr><td colSpan={9} style={{ textAlign: "center", color: "#888", padding: 24 }}>
                                        No inquiries yet — they arrive via the Booking-Hint webhook once Agoda enables it for our connection.
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgodaInquiries;
