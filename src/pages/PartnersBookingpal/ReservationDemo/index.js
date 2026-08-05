// -------------------------------------------------
// BookingPal reserve modal. Prices via the hub Get-Quote with the VT-FE
// up-sell markup (ceil(ceil(N)/0.86)), then takes a Flywire INSTANT card
// payment and books: on the payment return leg (/request-to-book-flywire) the
// BP CHANNEL reservation is created on the hub AND a reservation-of-record is
// written (VT-BE for VT, SHub for SH — via RESERVATION_API). Byte-identical
// across the VT and SH extranets; per-repo values come from constants.
// The lower "advanced" buttons keep the raw BP lifecycle ops for operators.
// -------------------------------------------------
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AuthService from "../../../services/auth.service";
import constants from "../../../Util/constants";
import { bpUpsell, extractBpQuoteNet } from "../../../Util/bpUpsell";
import { loadFlywireSDK, buildInstantConfig, resolveFlywireCharge } from "../../../Util/flywireInstant";
import swal from "sweetalert";

const todayPlus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

// YYYY-MM-DD (+ nights) → DD.MM.YYYY (VT-BE/SHub parseDate splits on '.').
const addDaysISO = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + Number(days || 0));
  return d.toISOString().slice(0, 10);
};
const ddmmyyyy = (iso) => {
  const [y, m, d] = String(iso || "").slice(0, 10).split("-");
  return y && m && d ? `${d}.${m}.${y}` : "";
};

const show = (title, data) =>
  swal({ title, text: typeof data === "string" ? data : JSON.stringify(data, null, 2) });

const errText = (e) =>
  e?.response?.data?.detail?.message ||
  (typeof e?.response?.data?.detail === "object" ? JSON.stringify(e.response.data.detail) : e?.response?.data?.detail) ||
  e?.response?.data?.error ||
  e?.message ||
  String(e);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional leading +, then 7–18 chars of digits/spaces/()-. Rejects junk like
// a 26-digit string.
const PHONE_RE = /^\+?[\d\s().-]{7,18}$/;

const ReservationDemo = ({ listing, onClose }) => {
  // listing.id = "BP-<n>"; listing_id sent to BookingPal = numeric part.
  const initialListingId = listing?.id ? String(listing.id).replace(/^BP-/, "") : "";

  const [listingId, setListingId] = useState(initialListingId);
  const [startDate, setStartDate] = useState(todayPlus(60));
  const [nights, setNights] = useState(3);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [confirmationId, setConfirmationId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [busy, setBusy] = useState("");

  // Pricing (quote → up-sell)
  const [quoting, setQuoting] = useState(false);
  const [netTotal, setNetTotal] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [quoteCurrency, setQuoteCurrency] = useState("");
  const [agencyCommission, setAgencyCommission] = useState(0);
  // What the guest is ACTUALLY charged (may be USD-converted for non-USD/CHF/EUR).
  const [chargeAmount, setChargeAmount] = useState(0);
  const [chargeCurrency, setChargeCurrency] = useState("");
  const [priced, setPriced] = useState(false);
  const [paying, setPaying] = useState(false);

  // Load currency rates once (into localStorage.exchangeRatesData) so the USD
  // conversion for USD-only charge portals (e.g. the Flywire demo portal, or a
  // non-USD/CHF/EUR currency) works even when the operator opened this page
  // without first visiting a page that loads them.
  const ensureExchangeRates = async () => {
    try {
      const existing = JSON.parse(localStorage.getItem("exchangeRatesData") || "null");
      if (existing && Object.keys(existing).length > 0) return;
      const res = await AuthService.getExchangeRates();
      const arr = res?.data;
      if (Array.isArray(arr) && arr.length) {
        const map = {};
        arr.forEach((item) => {
          if (item?.currency_code) map[item.currency_code] = { conversion_rates: item.conversion_rates };
        });
        localStorage.setItem("exchangeRatesData", JSON.stringify(map));
      }
    } catch (e) {
      console.error("exchange-rate load failed", e);
    }
  };

  useEffect(() => {
    loadFlywireSDK().catch((e) => console.error(e));
    ensureExchangeRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-price whenever the stay inputs change (must re-quote before paying).
  const invalidatePrice = () => { setPriced(false); setSellingPrice(0); setNetTotal(0); setChargeAmount(0); setChargeCurrency(""); };

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

  // Quote the hub, apply the up-sell markup, show the charged price.
  const getPrice = async () => {
    if (!listingId || !startDate || !Number(nights) || !Number(numberOfGuests)) {
      swal("Missing details", "Enter listing, dates, nights and guests first.", "warning");
      return;
    }
    const n = Number(nights);
    const g = Number(numberOfGuests);
    if (!Number.isInteger(n) || n < 1 || n > 90) {
      swal("Check nights", "Nights must be a whole number between 1 and 90.", "warning");
      return;
    }
    if (!Number.isInteger(g) || g < 1 || g > 50) {
      swal("Check guests", "Guests must be a whole number between 1 and 50.", "warning");
      return;
    }
    if (startDate < new Date().toISOString().slice(0, 10)) {
      swal("Check date", "The start date can't be in the past.", "warning");
      return;
    }
    setQuoting(true);
    try {
      const res = await AuthService.bpQuote({
        listing_id: listingId,
        start_date: startDate,
        nights: Number(nights),
        number_of_guests: Number(numberOfGuests),
      });
      if (res?.data?.success === false) {
        swal("Quote failed", String(res.data.detail || res.data.error || "No price available"), "error");
        invalidatePrice();
        return;
      }
      const { net, currency } = extractBpQuoteNet(res?.data);
      if (!(net > 0)) {
        swal("No price", "BookingPal returned no usable price for these dates.", "error");
        invalidatePrice();
        return;
      }
      const up = bpUpsell(net);
      // Resolve the actual charge (native portal, else USD-converted) so the
      // displayed + recorded amount/currency match what Flywire charges. Make
      // sure FX rates are loaded first (needed for the USD-conversion path).
      await ensureExchangeRates();
      const charge = resolveFlywireCharge(up.sellingPrice, currency);
      if (charge.amount == null || !(charge.amount > 0)) {
        swal("Currency unavailable", `No conversion rate for ${currency}. Cannot take card payment for this currency.`, "error");
        invalidatePrice();
        return;
      }
      setNetTotal(up.net);
      setSellingPrice(up.sellingPrice);
      setAgencyCommission(up.agencyCommission);
      setQuoteCurrency(currency);
      setChargeAmount(charge.amount);
      setChargeCurrency(charge.chargeCurrency);
      setPriced(true);
    } catch (e) {
      swal("Quote error", errText(e), "error");
      invalidatePrice();
    } finally {
      setQuoting(false);
    }
  };

  // Take the Flywire INSTANT payment; the return leg finalizes the booking.
  const bookAndPay = async () => {
    if (!priced || !(sellingPrice > 0)) {
      swal("Get a price first", "Click “Get price” before paying.", "warning");
      return;
    }
    if (!guestName.trim() || !guestEmail.trim()) {
      swal("Guest details", "Enter the guest name and email.", "warning");
      return;
    }
    if (!EMAIL_RE.test(guestEmail.trim())) {
      swal("Check email", "Enter a valid guest email address.", "warning");
      return;
    }
    if (guestPhone.trim() && !PHONE_RE.test(guestPhone.trim())) {
      swal("Check phone", "Enter a valid phone number — 7 to 18 digits, with an optional leading +.", "warning");
      return;
    }
    // The SDK loads async on mount; if it isn't ready yet (or a first load
    // failed), try once more on-demand before giving up.
    if (!window.FlywirePayment) {
      try { await loadFlywireSDK(); } catch (e) { /* handled below */ }
    }
    if (!window.FlywirePayment) {
      swal(
        "Payment unavailable",
        "The Flywire payment SDK could not load — it may be blocked by an ad-blocker/privacy extension or your network. Open the browser console, check for a blocked request to payment.flywire.com, then try again.",
        "error"
      );
      return;
    }

    const callbackId = "BP" + uuidv4();
    const parts = guestName.trim().split(/\s+/);
    const guestFirstName = parts[0] || "";
    const guestLastName = parts.slice(1).join(" ") || "-";
    const endISO = addDaysISO(startDate, nights);
    const agent = JSON.parse(localStorage.getItem("agent") || "{}");
    const travelAgency = JSON.parse(localStorage.getItem("travelAgency") || "{}");

    // Validate the operator context BEFORE charging — add-reservation (which
    // runs on the post-payment return leg) hard-requires these, so a missing
    // agent identity here would charge the card and then fail to save the
    // reservation-of-record. Block up front instead.
    const agencyName = travelAgency?.agencyName || agent?.agencyName;
    if (!agent?.agent_id || !agent?.agency_id || !agencyName) {
      swal("Session issue", "Your agent/agency profile is incomplete. Please re-login before taking payment.", "error");
      return;
    }

    // What the guest is actually charged (resolved once, consistent with the
    // Flywire config amount). Store THIS on the reservation-of-record.
    const charge = resolveFlywireCharge(sellingPrice, quoteCurrency);
    if (charge.amount == null || !(charge.amount > 0)) {
      swal("Currency unavailable", `No conversion rate for ${quoteCurrency}. Cannot take payment for this currency.`, "error");
      return;
    }

    const vtbe = {
      agent_id: agent.agent_id,
      agency_id: agent.agency_id,
      agencyName,
      agentName: agent?.firstName,
      agentEmail: agent?.email,
      client_id: constants.BP_OPERATOR_CLIENT_ID,
      bookedAt: new Date().toISOString(),
      bookingId: callbackId,
      confirmationCode: callbackId,
      cancellationPolicyCategory: "string",
      currency: charge.chargeCurrency,        // matches the actual charge
      startDate: ddmmyyyy(startDate),
      endDate: ddmmyyyy(endISO),
      fees: "0",
      guestFirstName,
      guestLastName,
      guestEmail,
      guestPhoneNumbers: guestPhone,
      guestPreferredLocale: "en",
      nightlyBasePrice: String(Math.max(1, Math.round(charge.amount / Math.max(1, Number(nights))))),
      nights: Number(nights),
      numberOfGuests: String(numberOfGuests),
      payment_type: "instant",
      propertyId: `BP-${listingId}`,
      status: "approved",
      total: charge.amount,                   // what the guest is charged
      // Authoritative expected amount for the webhook reconciliation (what we
      // asked Flywire to charge, in the charge currency) — NOT the return-URL echo.
      flywireAmount: String(charge.amount),
      propertyName: listing?.data?.title || "",
      securityDeposit: 0,
    };

    const pending = {
      listing_id: listingId,
      start_date: startDate,
      nights: Number(nights),
      number_of_guests: Number(numberOfGuests),
      currency: quoteCurrency,                // native currency for the CHANNEL total
      netTotal,
      guest: { name: guestName, email: guestEmail, phone: guestPhone },
      vtbe,
    };
    localStorage.setItem("bpPendingReservation", JSON.stringify(pending));

    const returnUrl = `${window.location.origin}/request-to-book-flywire/?confirmation=${callbackId}&ptype=instant`;
    const config = buildInstantConfig({
      callbackId,
      sellingPrice,
      currency: quoteCurrency,
      guest: { firstName: guestFirstName, lastName: guestLastName, email: guestEmail, phone: guestPhone },
      returnUrl,
      onError: () => setPaying(false),
    });
    if (config.amount == null) {
      swal("Currency unavailable", `No conversion rate for ${quoteCurrency}. Cannot take payment for this currency.`, "error");
      localStorage.removeItem("bpPendingReservation");
      return;
    }
    try {
      setPaying(true);
      window.FlywirePayment.initiate(config).render();
    } catch (e) {
      setPaying(false);
      swal("Payment error", errText(e), "error");
    }
  };

  const onCheckAvailability = () =>
    wrap("Check availability", () => AuthService.bpCheckAvailability({ listing_id: listingId, start_date: startDate, nights }));

  const onQuote = () =>
    wrap("Quote", () => AuthService.bpQuote({ listing_id: listingId, start_date: startDate, nights, number_of_guests: numberOfGuests }));

  const onQuotePreview = () =>
    wrap("Quote preview", () => AuthService.bpQuotePreview({ reservation_id: confirmationId, start_date: startDate, nights, number_of_guests: numberOfGuests }));

  const onCreate = async () => {
    // Raw operator create (no Flywire). Payment for real bookings goes through
    // the "Book & Pay" flow above; this sends the quote NET to the channel.
    const body = await wrap("Create reservation", () =>
      AuthService.bpCreateReservation({
        listing_id: listingId,
        start_date: startDate,
        nights: Number(nights),
        number_of_guests: Number(numberOfGuests),
        total: Number(netTotal || 0),
        currency: quoteCurrency || "USD",
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
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060, position: "fixed", inset: 0, overflowY: "auto", padding: "90px 0 24px" }}
    >
      <div className="modal-dialog modal-lg" role="document" style={{ marginTop: 0 }}>
        <div className="modal-content" style={{ maxHeight: "calc(100vh - 114px)", overflowY: "auto" }}>
          <div
            className="modal-header"
            style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <h4 className="modal-title" style={{ fontSize: 20, padding: "8px 12px", margin: 0 }}>
              Reserve — {listing?.data?.title || listing?.id || ""}
            </h4>
            <button type="button" className="close" aria-label="Close" onClick={onClose} style={{ fontSize: "1.8rem", fontWeight: 700, padding: "0 12px", background: "none", border: "none", cursor: "pointer" }}>
              &times;
            </button>
          </div>

          <div className="modal-body" style={{ padding: 20 }}>
            <div className="row">
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Listing ID *</label>
                <input type="number" className="form-control" value={listingId} onChange={(e) => { setListingId(e.target.value); invalidatePrice(); }} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Start date</label>
                <input type="date" className="form-control" min={new Date().toISOString().slice(0, 10)} value={startDate} onChange={(e) => { setStartDate(e.target.value); invalidatePrice(); }} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label>Nights</label>
                <input type="number" className="form-control" min={1} max={90} value={nights} onChange={(e) => { setNights(e.target.value); invalidatePrice(); }} />
              </div>
              <div className="col-md-3" style={{ marginBottom: 8 }}>
                <label># Guests</label>
                <input type="number" className="form-control" min={1} max={50} value={numberOfGuests} onChange={(e) => { setNumberOfGuests(e.target.value); invalidatePrice(); }} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest name *</label>
                <input type="text" className="form-control" maxLength={80} value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              </div>
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest email *</label>
                <input type="email" className="form-control" maxLength={120} value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
              </div>
              <div className="col-md-4" style={{ marginBottom: 8 }}>
                <label>Guest phone</label>
                <input type="tel" className="form-control" maxLength={18} placeholder="+41 79 123 45 67" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
              </div>
            </div>

            {/* Price panel */}
            <div style={{ marginTop: 8, padding: 12, background: "#f6f8fb", borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-outline-primary" disabled={quoting || paying} onClick={getPrice}>
                  {quoting ? "Getting price…" : "Get price"}
                </button>
                {priced && (
                  <div style={{ fontSize: 14 }}>
                    <span style={{ color: "#666" }}>Charged now: </span>
                    <strong style={{ fontSize: 18 }}>{chargeCurrency} {chargeAmount}</strong>
                    {chargeCurrency !== quoteCurrency && (
                      <span style={{ color: "#999", marginLeft: 8 }}>(≈ {quoteCurrency} {sellingPrice})</span>
                    )}
                    <span style={{ color: "#999", marginLeft: 10 }}>(net {quoteCurrency} {netTotal} · agency {quoteCurrency} {Math.round(agencyCommission)})</span>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-success" disabled={!priced || paying} onClick={bookAndPay}>
                  {paying ? "Opening payment…" : "Book & Pay (Instant)"}
                </button>
              </div>
            </div>

            {/* Advanced BP lifecycle ops (operator tools) */}
            <details style={{ marginTop: 16 }}>
              <summary style={{ cursor: "pointer", color: "#666" }}>Advanced (raw BookingPal operations)</summary>
              <div className="row" style={{ marginTop: 8 }}>
                <div className="col-md-6" style={{ marginBottom: 8 }}>
                  <label>Confirmation ID</label>
                  <input type="text" className="form-control" value={confirmationId} onChange={(e) => setConfirmationId(e.target.value)} />
                </div>
                <div className="col-md-6" style={{ marginBottom: 8 }}>
                  <label>Confirmation code</label>
                  <input type="text" className="form-control" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                <button className="btn btn-outline-primary" disabled={!!busy} onClick={onCheckAvailability}>Check availability</button>
                <button className="btn btn-outline-primary" disabled={!!busy} onClick={onQuote}>Get quote (raw)</button>
                <button className="btn btn-primary" disabled={!!busy} onClick={onCreate}>Create reservation</button>
                <button className="btn btn-outline-secondary" disabled={!!busy || !confirmationId} onClick={onDetails}>Details</button>
                <button className="btn btn-outline-secondary" disabled={!!busy || !confirmationId} onClick={onQuotePreview}>Quote preview</button>
                <button className="btn btn-outline-warning" disabled={!!busy || !confirmationId} onClick={onModify}>Modify</button>
                <button className="btn btn-danger" disabled={!!busy || !confirmationCode} onClick={onCancel}>Cancel</button>
              </div>
              {busy && <div style={{ marginTop: 10, color: "#888" }}>{busy}…</div>}
            </details>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={!!busy || paying}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDemo;
