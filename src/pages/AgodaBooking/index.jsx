import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import swal from "sweetalert";
import { fetchBookingDetail, updateInquiryStatus } from "../../services/agoda.service.js";
import { PATH_AGODA_INQUIRIES } from "../../Util/constants.js";

// Full booking detail — what a Booking Hint actually contains, laid out the
// way an agent reads it: guest, stay, room/rate, money, cancellation policy,
// special requests. Backed by GET /services/agoda/bookings/:bookingId, which
// merges our stored inquiry with a live GetBookingDetails pull from Agoda.
const STATUSES = ["new", "in_progress", "confirmed", "rejected", "cancelled", "expired"];

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const fmtDateTime = (d) => (d ? new Date(d).toLocaleString("en-GB") : "—");
const money = (n, cur) => (n == null ? "—" : `${Number(n).toLocaleString()} ${cur || ""}`.trim());

// Agoda cancellation codes: "0D100P_100P" = from 0 days out, 100% penalty.
const explainCxl = (code) => {
  if (!code) return null;
  const m = String(code).match(/^(\d+)D(\d+)P/i);
  if (!m) return code;
  const [, days, pct] = m;
  return Number(pct) >= 100
    ? `Non-refundable — ${pct}% penalty from ${days} day(s) before arrival`
    : `${pct}% penalty from ${days} day(s) before arrival`;
};

const Row = ({ label, children }) => (
  <div style={{ display: "flex", padding: "6px 0", borderBottom: "1px solid #f0f2f5" }}>
    <div style={{ width: 190, color: "#6b7280", fontSize: 12, flexShrink: 0 }}>{label}</div>
    <div style={{ fontSize: 13, color: "#111827" }}>{children ?? "—"}</div>
  </div>
);

const Card = ({ title, children, right }) => (
  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
      {right}
    </div>
    {children}
  </div>
);

const AgodaBooking = (props) => {
  const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;
  const { bookingId } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchBookingDetail(bookingId);
      setData(res);
    } catch (e) {
      swal({ title: "Could not load booking", text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
    }
    setIsLoading(false);
  }, [bookingId]);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (next) => {
    if (!data?.inquiry?.id) return;
    setIsLoading(true);
    try {
      await updateInquiryStatus(data.inquiry.id, next);
      await load();
    } catch (e) {
      setIsLoading(false);
      swal({ title: "Status change failed", text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
    }
  };

  const b = data?.booking || null;
  const inq = data?.inquiry || null;
  const statusColor = { new: "#2b6cb0", in_progress: "#a15c1a", confirmed: "#1d6f42", rejected: "#b02b2b", cancelled: "#666", expired: "#999" }[inq?.status] || "#666";
  const cxl = explainCxl(b?.cancellationCode);
  const nonRefundable = /Non-refundable/i.test(cxl || "");

  return (
    <div className="page-container">
      <div className="page-header">VT-Extranet : Agoda Booking</div>
      <Sidebar agency={agency} agent={agent} screenSize={screenSize} activeMenu={activeMenu} handleToggleMenu={handleToggleMenu} />
      <div className="page-body">
        <div className="listings-container">
          <LoadingBox visible={isLoading} />
          <div className="listings-main" style={{ maxWidth: 900 }}>

            <button onClick={() => history.push(PATH_AGODA_INQUIRIES)} style={backBtn}>&larr; All Agoda bookings</button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0 18px" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>Booking {bookingId}</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>
                  {b?.hotelName || "—"} · property {b?.hotelCode || inq?.hotelCode || "—"}
                </div>
              </div>
              {inq?.status && (
                <span style={{ marginLeft: "auto", color: "#fff", background: statusColor, padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                  {inq.status}
                </span>
              )}
              {b?.status && <span style={{ ...chip, background: "#eef2ff", color: "#3730a3" }}>{b.status}</span>}
              {b && !b.acknowledged && <span style={{ ...chip, background: "#fef3c7", color: "#92400e" }}>unacknowledged</span>}
            </div>

            {data?.liveFetchError && (
              <div style={warn}>Live Agoda fetch failed ({data.liveFetchError}) — showing stored data only.</div>
            )}
            {nonRefundable && (
              <div style={{ ...warn, background: "#fee2e2", borderColor: "#fca5a5", color: "#991b1b" }}>
                <b>Non-refundable rate.</b> {cxl}
              </div>
            )}

            <Card title="Guest">
              <Row label="Name">{b ? `${b.guestFirstName || ""} ${b.guestLastName || ""}`.trim() : inq?.guestName}</Row>
              <Row label="Email">{b?.guestEmail || inq?.guestEmail}</Row>
              <Row label="Nationality">{b?.guestCountry || inq?.guestCountry}</Row>
            </Card>

            <Card title="Stay">
              <Row label="Check-in">{fmtDate(b?.checkIn || inq?.checkIn)}</Row>
              <Row label="Check-out">{fmtDate(b?.checkOut || inq?.checkOut)}</Row>
              <Row label="Nights">{b?.nightlyPrices?.length || inq?.nights || "—"}</Row>
              <Row label="Rooms">{b?.rooms ?? "—"}</Row>
              <Row label="Guests">
                {b ? `${b.adults ?? 0} adult(s)${b.children ? `, ${b.children} child(ren)` : ""}${b.extraBeds ? `, ${b.extraBeds} extra bed(s)` : ""}` : "—"}
              </Row>
            </Card>

            <Card title="Room & rate plan">
              <Row label="Room type">{b?.roomType} {b?.roomTypeCode ? <span style={mono}>({b.roomTypeCode})</span> : null}</Row>
              <Row label="Rate plan">{b?.ratePlanName} {b?.ratePlanCode ? <span style={mono}>({b.ratePlanCode})</span> : null}</Row>
              <Row label="Booked via">{b?.channelName}{b?.channelCode ? <span style={{ ...mono, marginLeft: 6 }}>(channel {b.channelCode})</span> : null}</Row>
              {b?.promotionName && (
                <Row label="YCS promotion">
                  {b.promotionName} {b.promotionCode ? <span style={mono}>({b.promotionCode})</span> : null}
                </Row>
              )}
              <Row label="Payment">
                {b?.paymentModel === 2 ? "Agoda collects (prepaid) — charge the guest nothing on arrival"
                  : b?.paymentModel === 1 ? "Property collects from guest"
                  : "—"}
              </Row>
              <Row label="Cancellation policy">
                {cxl ? <span style={{ color: nonRefundable ? "#b91c1c" : "#111827" }}>{cxl}</span> : "—"}
                {b?.cancellationCode ? <span style={{ ...mono, marginLeft: 6 }}>{b.cancellationCode}</span> : null}
              </Row>
              {b?.benefits?.length > 0 && <Row label="Benefits">{b.benefits.join(", ")}</Row>}
            </Card>

            <Card title="Price breakdown" right={<div style={{ fontSize: 16, fontWeight: 700 }}>{money(b?.netTotal ?? inq?.totalAmount, b?.currency || inq?.currency)}</div>}>
              {b?.nightlyPrices?.length > 0 ? (
                <table className="table table-sm" style={{ fontSize: 13, marginBottom: 0 }}>
                  <thead>
                    <tr><th>Date</th><th>Type</th><th style={{ textAlign: "right" }}>Net (we receive)</th><th style={{ textAlign: "right" }}>Guest pays</th></tr>
                  </thead>
                  <tbody>
                    {b.nightlyPrices.map((p, i) => (
                      <tr key={i}>
                        <td>{fmtDate(p.date)}</td>
                        <td>{p.type}</td>
                        <td style={{ textAlign: "right" }}>{money(p.net, b.currency)}</td>
                        <td style={{ textAlign: "right", color: "#6b7280" }}>{money(p.sell, b.currency)}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 700, borderTop: "2px solid #e5e7eb" }}>
                      <td colSpan={2}>Total</td>
                      <td style={{ textAlign: "right" }}>{money(b.netTotal, b.currency)}</td>
                      <td style={{ textAlign: "right", color: "#6b7280" }}>{money(b.sellTotal, b.currency)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : <Row label="Total">{money(inq?.totalAmount, inq?.currency)}</Row>}
            </Card>

            {b?.specialRequests?.length > 0 && (
              <Card title="Special requests">
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
                  {b.specialRequests.map((r, i) => <li key={i} style={{ marginBottom: 4 }}>{r}</li>)}
                </ul>
              </Card>
            )}

            <Card title="Internal">
              <Row label="Received">{fmtDateTime(inq?.receivedAt || b?.bookingDate)}</Row>
              <Row label="Booked on Agoda">{fmtDateTime(b?.bookingDate)}</Row>
              <Row label="Last action">{fmtDateTime(b?.lastAction)}</Row>
              <Row label="Our status">
                {inq?.id ? (
                  <select className="form-control" style={{ fontSize: 12, padding: "2px 6px", width: 160, display: "inline-block" }}
                    value={inq.status} onChange={(e) => changeStatus(e.target.value)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : <span style={{ color: "#6b7280" }}>not in our inquiry queue</span>}
              </Row>
              {inq?.notes && <Row label="Notes">{inq.notes}</Row>}
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

const chip = { padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 };
const mono = { fontFamily: "monospace", fontSize: 11, color: "#6b7280" };
const backBtn = { border: "none", background: "transparent", color: "#2b6cb0", cursor: "pointer", fontSize: 13, padding: 0 };
const warn = { background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e", borderRadius: 6, padding: "10px 14px", fontSize: 13, marginBottom: 16 };

export default AgodaBooking;
