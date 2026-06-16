// -------------------------------------------------
// PartnersHostaway / BookingDemo — two-stage modal for the Partner
// Certification demo:
//   Stage 1: create a test reservation on the Hostaway side
//     POST /hostaway-create-reservation
//   Stage 2: cancel the just-created reservation
//     PUT  /hostaway-cancel-reservation
// Both call our existing VTHub Hostaway routes; non-idempotent (retries: 0
// on the backend) so duplicate submissions are not retried.
// -------------------------------------------------
import React, { useState } from "react"
import AuthService from "../../../services/auth.service"
import swal from "sweetalert"
import "./BookingDemo.scss"

const todayPlus = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const BookingDemo = ({ partner, onClose }) => {
  const accountId = partner?.accountId

  // Stage 1 (create) form state
  const [listingMapId, setListingMapId] = useState("")
  const [arrivalDate, setArrivalDate] = useState(todayPlus(60))
  const [departureDate, setDepartureDate] = useState(todayPlus(64))
  const [guestName, setGuestName] = useState("VT Test Booking")
  const [guestEmail, setGuestEmail] = useState("vt-test@example.com")
  const [totalPrice, setTotalPrice] = useState(500)
  const [currency, setCurrency] = useState("USD")
  const [numberOfGuests, setNumberOfGuests] = useState(2)
  const [channelId, setChannelId] = useState(2000) // 2000 = Manual reservation

  // Result of Stage 1 (drives Stage 2)
  const [lastReservationId, setLastReservationId] = useState(null)
  const [lastReservationStatus, setLastReservationStatus] = useState(null)
  const [cancelledBy, setCancelledBy] = useState("host")

  const [creating, setCreating] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const handleCreate = async () => {
    const listingMapIdNum = Number(listingMapId)
    if (!Number.isInteger(listingMapIdNum) || listingMapIdNum <= 0) {
      swal({ icon: "error", title: "Listing ID required", text: "Enter the numeric Hostaway listingMapId (e.g. 543223)." })
      return
    }
    setCreating(true)
    try {
      const res = await AuthService.createHostawayBooking({
        accountId,
        listingMapId: listingMapIdNum,
        channelId,
        guestName,
        guestEmail,
        arrivalDate,
        departureDate,
        totalPrice: Number(totalPrice),
        currency,
        numberOfGuests: Number(numberOfGuests),
      })
      if (res?.data?.success) {
        const r = res.data.result
        setLastReservationId(r?.id)
        setLastReservationStatus(r?.status || "new")
        swal({
          icon: "success",
          title: "Reservation created",
          text: `id ${r?.id} • status ${r?.status} • ${arrivalDate} → ${departureDate}`,
        })
      } else {
        swal({ icon: "error", title: "Create failed", text: res?.data?.error || "Unknown response" })
      }
    } catch (e) {
      swal({
        icon: "error",
        title: "Hostaway rejected the booking",
        text: e?.response?.data?.detail?.message || e?.response?.data?.error || e?.message || String(e),
      })
    }
    setCreating(false)
  }

  const handleCancel = async () => {
    if (!lastReservationId) {
      swal({ icon: "error", title: "No reservation to cancel", text: "Create one first." })
      return
    }
    setCancelling(true)
    try {
      const res = await AuthService.cancelHostawayBooking({
        accountId,
        reservationId: lastReservationId,
        cancelledBy,
      })
      if (res?.data?.success) {
        const r = res.data.result
        setLastReservationStatus(r?.status || "cancelled")
        swal({
          icon: "success",
          title: "Reservation cancelled",
          text: `id ${r?.id} • status ${r?.status} • cancelledBy ${r?.cancelledBy}`,
        })
      } else {
        swal({ icon: "error", title: "Cancel failed", text: res?.data?.error || "Unknown response" })
      }
    } catch (e) {
      swal({
        icon: "error",
        title: "Cancel rejected",
        text: e?.response?.data?.detail?.message || e?.response?.data?.error || e?.message || String(e),
      })
    }
    setCancelling(false)
  }

  return (
    <div className="hostaway-booking-demo" style={{ padding: "24px" }}>
      <div style={{ marginBottom: 16, color: "#555", fontSize: 13 }}>
        Demo flow for Partner Certification: create a manual reservation, then cancel it.
        Each click writes directly to Hostaway (sandbox or live, depending on the connected account)
        and our webhook handler will receive the corresponding <code>reservation.created</code> /
        <code> reservation.updated</code> events.
      </div>

      {/* ------------- Stage 1: Create ------------- */}
      <h4 style={{ marginTop: 8 }}>Stage 1 — Create test booking</h4>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="col-md-6" style={{ marginBottom: 8 }}>
          <label>Listing Map ID *</label>
          <input
            type="number"
            className="form-control"
            value={listingMapId}
            placeholder="e.g. 543223"
            onChange={(e) => setListingMapId(e.target.value)}
          />
        </div>
        <div className="col-md-3" style={{ marginBottom: 8 }}>
          <label>Channel ID</label>
          <input
            type="number"
            className="form-control"
            value={channelId}
            onChange={(e) => setChannelId(Number(e.target.value))}
          />
          <small style={{ color: "#888" }}>2000 = Manual</small>
        </div>
        <div className="col-md-3" style={{ marginBottom: 8 }}>
          <label># Guests</label>
          <input
            type="number"
            className="form-control"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="col-md-6" style={{ marginBottom: 8 }}>
          <label>Guest Name</label>
          <input
            type="text"
            className="form-control"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        </div>
        <div className="col-md-6" style={{ marginBottom: 8 }}>
          <label>Guest Email</label>
          <input
            type="email"
            className="form-control"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="col-md-4" style={{ marginBottom: 8 }}>
          <label>Arrival</label>
          <input
            type="date"
            className="form-control"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>
        <div className="col-md-4" style={{ marginBottom: 8 }}>
          <label>Departure</label>
          <input
            type="date"
            className="form-control"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <div className="col-md-2" style={{ marginBottom: 8 }}>
          <label>Total</label>
          <input
            type="number"
            className="form-control"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2" style={{ marginBottom: 8 }}>
          <label>Currency</label>
          <input
            type="text"
            className="form-control"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? "Creating…" : "Create reservation"}
        </button>
      </div>

      {/* ------------- Result panel ------------- */}
      {lastReservationId && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f4f8fd",
            border: "1px solid #c5dbef",
            borderRadius: 6,
          }}
        >
          <strong>Last reservation:</strong> id <code>{lastReservationId}</code> — status <code>{lastReservationStatus}</code>
        </div>
      )}

      {/* ------------- Stage 2: Cancel ------------- */}
      <hr style={{ marginTop: 24, marginBottom: 16 }} />
      <h4>Stage 2 — Cancel last booking</h4>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="col-md-6" style={{ marginBottom: 8 }}>
          <label>Reservation ID</label>
          <input
            type="number"
            className="form-control"
            value={lastReservationId || ""}
            disabled
          />
        </div>
        <div className="col-md-3" style={{ marginBottom: 8 }}>
          <label>Cancelled By</label>
          <select
            className="form-control"
            value={cancelledBy}
            onChange={(e) => setCancelledBy(e.target.value)}
          >
            <option value="host">host</option>
            <option value="guest">guest</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button
          className="btn btn-secondary"
          onClick={onClose}
          disabled={cancelling || creating}
        >
          Close
        </button>
        <button
          className="btn btn-danger"
          onClick={handleCancel}
          disabled={cancelling || !lastReservationId}
        >
          {cancelling ? "Cancelling…" : "Cancel reservation"}
        </button>
      </div>
    </div>
  )
}

export default BookingDemo
