// -------------------------------------------------
// BookingPal Reservation Management demo modal (mirrors PartnersHostaway/BookingDemo).
// Drives all 7 OUTBOUND BookingPal reservation operations via VTHub/SHub
// (/local/bookingpal/*). Launched per-listing from ListingsBookingpal.
// -------------------------------------------------
import React, { useState } from "react";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";

const todayPlus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const show = (title, data) =>
  swal({ title, text: typeof data === "string" ? data : JSON.stringify(data, null, 2) });

const errText = (e) =>
  e?.response?.data?.detail?.message ||
  (typeof e?.response?.data?.detail === "object" ? JSON.stringify(e.response.data.detail) : e?.response?.data?.detail) ||
  e?.response?.data?.error ||
  e?.message ||
  String(e);

const ReservationDemo = ({ listing, onClose }) => {
  // listing.id = "BP-<n>"; listing_id sent to BookingPal = numeric part.
  const initialListingId = listing?.id ? String(listing.id).replace(/^BP-/, "") : "";

  const [listingId, setListingId] = useState(initialListingId);
  const [startDate, setStartDate] = useState(todayPlus(60));
  const [nights, setNights] = useState(3);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [guestName, setGuestName] = useState("VT Test Guest");
  const [guestEmail, setGuestEmail] = useState("vt-test@example.com");
  const [guestPhone, setGuestPhone] = useState("+10000000000");
  const [total, setTotal] = useState(500);
  const [currency, setCurrency] = useState("USD");

  const [confirmationId, setConfirmationId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [busy, setBusy] = useState("");

  const wrap = async (label, fn) => {
    setBusy(label);
    try {
      const res = await fn();
      const body = res?.data;
      if (body && body.success === false) {
        show(`${label} failed`, body.detail || body.error || body);
      } else {
        show(`${label} ✓`, body?.result ?? body);
      }
      return body;
    } catch (e) {
      show(`${label} rejected`, errText(e));
    } finally {
      setBusy("");
    }
  };

  const onCheckAvailability = () =>
    wrap("Check availability", () => AuthService.bpCheckAvailability({ listing_id: listingId, start_date: startDate, nights }));

  const onQuote = () =>
    wrap("Quote", () => AuthService.bpQuote({ listing_id: listingId, start_date: startDate, nights, number_of_guests: numberOfGuests }));

  const onQuotePreview = () =>
    wrap("Quote preview", () => AuthService.bpQuotePreview({ reservation_id: confirmationId, start_date: startDate, nights, number_of_guests: numberOfGuests }));

  const onCreate = async () => {
    const body = await wrap("Create reservation", () =>
      AuthService.bpCreateReservation({
        listing_id: listingId,
        start_date: startDate,
        nights: Number(nights),
        number_of_guests: Number(numberOfGuests),
        total: Number(total),
        currency,
        guest: { name: guestName, email: guestEmail, phone: guestPhone },
      })
    );
    const r = body?.result;
    if (r?.confirmation_id) setConfirmationId(r.confirmation_id);
    if (r?.confirmation_code) setConfirmationCode(r.confirmation_code);
  };

  const onDetails = () =>
    wrap("Reservation details", () => AuthService.bpReservationDetails({ confirmation_id: confirmationId }));

  const onModify = () =>
    wrap("Modify reservation", () => AuthService.bpModifyReservation({ confirmation_id: confirmationId, start_date: startDate, nights: Number(nights), body: {} }));

  const onCancel = () =>
    wrap("Cancel reservation", () => AuthService.bpCancelReservation({ confirmation_code: confirmationCode, confirmation_id: confirmationId }));

  return (
    <div
      className="modal fade show"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060, position: "fixed", inset: 0 }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" style={{ fontSize: 20, padding: "8px 12px" }}>
              BookingPal Reservation — {listing?.data?.title || listing?.id || ""}
            </h4>
            <button type="button" className="close" aria-label="Close" onClick={onClose} style={{ fontSize: "1.8rem", fontWeight: 700 }}>
              &times;
            </button>
          </div>

          <div className="modal-body" style={{ padding: 20 }}>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 12 }}>
              Outbound calls to BookingPal via the hub. Availability/Quote first, then Create; Details/Modify/Cancel use the returned confirmation id/code.
            </div>

            <div className="row">
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Listing ID *</label>
                <input type="number" className="form-control" value={listingId} onChange={(e) => setListingId(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Start date</label>
                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Nights</label>
                <input type="number" className="form-control" value={nights} onChange={(e) => setNights(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label># Guests</label>
                <input type="number" className="form-control" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest name</label>
                <input type="text" className="form-control" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              </div>
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest email</label>
                <input type="email" className="form-control" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
              </div>
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest phone</label>
                <input type="text" className="form-control" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Total</label>
                <input type="number" className="form-control" value={total} onChange={(e) => setTotal(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Currency</label>
                <input type="text" className="form-control" value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Confirmation ID</label>
                <input type="text" className="form-control" value={confirmationId} onChange={(e) => setConfirmationId(e.target.value)} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Confirmation code</label>
                <input type="text" className="form-control" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              <button className="btn btn-outline-primary" disabled={!!busy} onClick={onCheckAvailability}>Check availability</button>
              <button className="btn btn-outline-primary" disabled={!!busy} onClick={onQuote}>Get quote</button>
              <button className="btn btn-primary" disabled={!!busy} onClick={onCreate}>Create reservation</button>
              <button className="btn btn-outline-secondary" disabled={!!busy || !confirmationId} onClick={onDetails}>Details</button>
              <button className="btn btn-outline-secondary" disabled={!!busy || !confirmationId} onClick={onQuotePreview}>Quote preview</button>
              <button className="btn btn-outline-warning" disabled={!!busy || !confirmationId} onClick={onModify}>Modify</button>
              <button className="btn btn-danger" disabled={!!busy || !confirmationCode} onClick={onCancel}>Cancel</button>
            </div>
            {busy && <div style={{ marginTop: 10, color: "#888" }}>{busy}…</div>}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={!!busy}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDemo;
