// -------------------------------------------------
// Instant-book reserve page (recreated). Mirrors the VT-FE PropertyReserve flow
// and reuses the extranet's PROVEN Flywire INSTANT path — the identical logic
// ReservationDemo.bookAndPay uses (hub quote → up-sell → cancellation snapshot →
// bpPendingReservation → buildInstantConfig → FlywirePayment.initiate), finalized
// by the shared /request-to-book-flywire return leg. Inputs come from the
// detail-page Instant Book popup (nav-state) instead of the operator form; when
// arriving with autoInstant it opens the Flywire popup automatically (VT-FE
// parity). Byte-identical across the VT and SH extranets; per-repo values
// (RESERVATION_API / Flywire recipients) come from constants.
// -------------------------------------------------
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import swal from "sweetalert";
import PageHeader from "../../components/PageHeader";
import TermsFooter from "../../components/TermsFooter/TermsFooter";
import AuthService from "../../services/auth.service";
import constants, { PATH_SEARCH } from "../../Util/constants";
import { bpUpsell } from "../../Util/bpUpsell";
import { detectNonRefundable, smilingHouseCancellationCopy, cancellationForDates } from "../../Util/bookingTerms";
import { loadFlywireSDK, buildInstantConfig, resolveFlywireCharge } from "../../Util/flywireInstant";
import { getStorageValue } from "../../Util/general";
import "./PropertyReserve.scss";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{7,18}$/;

// DD.MM.YYYY for the VT-BE/SHub parseDate (splits on '.').
const ddmmyyyy = (iso) => {
  const [y, m, d] = String(iso || "").slice(0, 10).split("-");
  return y && m && d ? `${d}.${m}.${y}` : "";
};
const errText = (e) =>
  e?.response?.data?.detail?.message ||
  e?.response?.data?.error ||
  e?.message ||
  String(e);

const PropertyReservationPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  const st = (location && location.state) || {};
  const property = st.property;
  const autoInstant = !!st.autoInstant;

  // Stay context (dates + guests) comes from the search selection in
  // localStorage — the same source the detail-page quote used.
  const startISO = dayjs(getStorageValue("dateFrom")).isValid()
    ? dayjs(getStorageValue("dateFrom")).format("YYYY-MM-DD")
    : "";
  const endISO = dayjs(getStorageValue("dateTo")).isValid()
    ? dayjs(getStorageValue("dateTo")).format("YYYY-MM-DD")
    : "";
  const nights = startISO && endISO ? Math.max(1, dayjs(endISO).diff(dayjs(startISO), "day")) : 0;
  const numberOfGuests =
    (parseInt(localStorage.getItem("adults") || "1", 10) + parseInt(localStorage.getItem("children") || "0", 10)) || 1;

  // Instant book is a BookingPal (Flywire) flow: hub id is "BP-<n>".
  const hubId = property?._id ? String(property._id) : "";
  const isBP = hubId.startsWith("BP-");
  const listingId = isBP ? hubId.replace(/^BP-/, "") : "";

  const [client, setClient] = useState({
    firstName: "", lastName: "", middleName: "", email: "", phone: "",
    address: "", city: "", state: "", postalCode: "", country: "",
    ...(st.client || {}),
  });

  const [quoting, setQuoting] = useState(false);
  const [priced, setPriced] = useState(false);
  const [netTotal, setNetTotal] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [quoteCurrency, setQuoteCurrency] = useState("");
  const [chargeAmount, setChargeAmount] = useState(0);
  const [chargeCurrency, setChargeCurrency] = useState("");
  const [priceError, setPriceError] = useState("");
  const [paying, setPaying] = useState(false);

  const shCancel = smilingHouseCancellationCopy(property?.bookingTerms);
  const shCancelForDates = startISO ? cancellationForDates(property?.bookingTerms, startISO) : null;

  const onField = (name) => (e) => setClient((prev) => ({ ...prev, [name]: e.target.value }));

  // Ensure FX rates exist (needed for the USD-conversion charge path), same as
  // the ReservationDemo flow.
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

  // Quote the hub, apply the up-sell markup, resolve the charged amount.
  const getPrice = async () => {
    if (!isBP || !listingId || !startISO || !endISO || !nights || !numberOfGuests) {
      setPriceError("Select your dates and guests on the property page first.");
      return;
    }
    setQuoting(true);
    setPriceError("");
    try {
      const res = await AuthService.getUnifiedQuote({
        listingId: hubId,
        checkIn: startISO,
        checkOut: endISO,
        guests: numberOfGuests,
        currency: "USD",
      });
      const body = res?.data || {};
      if (body.ok === false || body.available === false) {
        setPriced(false);
        setPriceError(String(body.error || "No price available for these dates."));
        return;
      }
      const net = Number(body.netTotal);
      const currency = String(body.currency || "USD").toUpperCase();
      if (!(net > 0)) {
        setPriced(false);
        setPriceError("No usable price was returned for these dates.");
        return;
      }
      const up = bpUpsell(net);
      await ensureExchangeRates();
      const charge = resolveFlywireCharge(up.sellingPrice, currency);
      if (charge.amount == null || !(charge.amount > 0)) {
        setPriced(false);
        setPriceError(`No conversion rate for ${currency}. Card payment is unavailable for this currency.`);
        return;
      }
      setNetTotal(up.net);
      setSellingPrice(up.sellingPrice);
      setQuoteCurrency(currency);
      setChargeAmount(charge.amount);
      setChargeCurrency(charge.chargeCurrency);
      setPriced(true);
    } catch (e) {
      setPriced(false);
      setPriceError(errText(e));
    } finally {
      setQuoting(false);
    }
  };

  // Take the Flywire INSTANT payment; the return leg finalizes the booking.
  const bookAndPay = async () => {
    if (!priced || !(sellingPrice > 0)) {
      swal("Price not ready", "We couldn't confirm the price yet — please wait a moment and try again.", "warning");
      return;
    }
    if (!client.firstName.trim() || !client.lastName.trim() || !client.email.trim() || !client.phone.trim()) {
      swal("Guest details", "Enter the guest's first name, last name, email and phone.", "warning");
      return;
    }
    if (!EMAIL_RE.test(client.email.trim())) {
      swal("Check email", "Enter a valid guest email address.", "warning");
      return;
    }
    if (!PHONE_RE.test(client.phone.trim())) {
      swal("Check phone", "Enter a valid phone number — 7 to 18 digits, with an optional leading +.", "warning");
      return;
    }
    if (!client.address.trim() || !client.city.trim() || !client.country.trim()) {
      swal("Billing details", "Enter the address, city and country.", "warning");
      return;
    }

    if (!window.FlywirePayment) {
      try { await loadFlywireSDK(); } catch (e) { /* handled below */ }
    }
    if (!window.FlywirePayment) {
      swal(
        "Payment unavailable",
        "The Flywire payment SDK could not load — it may be blocked by an ad-blocker/privacy extension or your network. Check the browser console for a blocked request to payment.flywire.com, then try again.",
        "error"
      );
      return;
    }

    const callbackId = "BP" + uuidv4();
    const agent = JSON.parse(localStorage.getItem("agent") || "{}");
    const travelAgency = JSON.parse(localStorage.getItem("travelAgency") || "{}");
    const agencyName = travelAgency?.agencyName || agent?.agencyName;
    if (!agent?.agent_id || !agent?.agency_id || !agencyName) {
      swal("Session issue", "Your agent/agency profile is incomplete. Please re-login before taking payment.", "error");
      return;
    }

    // The charge, resolved once and consistent with the Flywire config amount.
    const charge = resolveFlywireCharge(sellingPrice, quoteCurrency);
    if (charge.amount == null || !(charge.amount > 0)) {
      swal("Currency unavailable", `No conversion rate for ${quoteCurrency}. Cannot take payment for this currency.`, "error");
      return;
    }

    // Freeze the cancellation policy the guest is agreeing to (refund overlay
    // reads this at cancel time). Base = the accommodation charged.
    const _cx = property?.bookingTerms?.cancellation || null;
    const cancellationSnapshot = {
      windows: (_cx && _cx.windows) || null,
      code: (_cx && _cx.code) || null,
      text: (_cx && _cx.text) || null,
      nonRefundable: detectNonRefundable(_cx),
      refundBaseAmount: charge.amount,
      propertyTimezone: property?.timezone || property?.address?.timezone || null,
      capturedAt: new Date().toISOString(),
    };

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
      cancellationSnapshot,
      currency: charge.chargeCurrency,
      startDate: ddmmyyyy(startISO),
      endDate: ddmmyyyy(endISO),
      fees: "0",
      guestFirstName: client.firstName.trim(),
      guestMiddleName: client.middleName.trim(),
      guestLastName: client.lastName.trim() || "-",
      guestEmail: client.email.trim(),
      guestPhoneNumbers: client.phone.trim(),
      guestAddress: client.address.trim(),
      guestCity: client.city.trim(),
      guestState: client.state.trim(),
      guestZip: client.postalCode.trim(),
      guestCountry: client.country.trim(),
      guestPreferredLocale: "en",
      nightlyBasePrice: String(Math.max(1, Math.round(charge.amount / Math.max(1, Number(nights))))),
      nights: Number(nights),
      numberOfGuests: String(numberOfGuests),
      payment_type: "instant",
      propertyId: hubId,
      status: "approved",
      total: charge.amount,
      flywireAmount: String(charge.amount),
      propertyName: property?.title || "",
      securityDeposit: 0,
    };

    const pending = {
      listing_id: listingId,
      start_date: startISO,
      nights: Number(nights),
      number_of_guests: Number(numberOfGuests),
      currency: quoteCurrency,
      netTotal,
      guest: { name: `${client.firstName} ${client.lastName}`.trim(), email: client.email.trim(), phone: client.phone.trim() },
      vtbe,
    };
    localStorage.setItem("bpPendingReservation", JSON.stringify(pending));

    const returnUrl = `${window.location.origin}/request-to-book-flywire/?confirmation=${callbackId}&ptype=instant`;
    const config = buildInstantConfig({
      callbackId,
      sellingPrice,
      currency: quoteCurrency,
      guest: { firstName: client.firstName.trim(), lastName: client.lastName.trim(), email: client.email.trim(), phone: client.phone.trim() },
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

  // Load the SDK + FX rates and quote up-front on mount.
  useEffect(() => {
    loadFlywireSDK().catch((e) => console.error(e));
    ensureExchangeRates();
    if (isBP) getPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-open Flywire when we arrived from the detail-page Instant Book popup.
  // Mount-only poller reading the latest state via a ref (so re-renders don't
  // reset the timer) — matches the VT-FE reserve-page auto-open.
  const firedRef = useRef(false);
  const latest = useRef({});
  latest.current = { priced, paying, client, bookAndPay };
  useEffect(() => {
    if (!autoInstant) return;
    let tries = 0;
    const timer = setInterval(() => {
      if (firedRef.current) { clearInterval(timer); return; }
      const s = latest.current;
      const ready =
        s.priced && !s.paying && window.FlywirePayment &&
        s.client?.firstName && s.client?.lastName && s.client?.email &&
        s.client?.phone && s.client?.address && s.client?.city && s.client?.country;
      if (ready) { firedRef.current = true; clearInterval(timer); s.bookAndPay(); }
      else if (++tries > 100) { clearInterval(timer); }
    }, 200);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!property) {
    return (
      <div className="property-page-wrapper">
        <PageHeader bgColor="#133B71" />
        <div style={{ padding: 60, textAlign: "center" }}>
          <h3>No property selected.</h3>
          <button className="btn btn-primary mt-3" onClick={() => history.push(PATH_SEARCH)}>Back to search</button>
        </div>
      </div>
    );
  }

  const money = (cur, amt) => `${cur || ""} ${Number(amt || 0).toLocaleString()}`.trim();

  return (
    <div className="property-page-wrapper">
      <PageHeader bgColor="#133B71" />
      <div className="property-page-container" style={{ maxWidth: 980, margin: "0 auto", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, margin: "8px 0 16px" }}>
          <h1 style={{ margin: 0 }}>Instant Book</h1>
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => history.goBack()}>&laquo; Back</span>
        </div>

        {/* Booking summary */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 18, marginBottom: 18 }}>
          <h3 style={{ marginTop: 0 }}>{property?.title || "Property"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 10 }}>
            <div><div style={{ color: "#888", fontSize: 13 }}>Check-in</div><div style={{ fontWeight: 600 }}>{startISO || "—"}</div></div>
            <div><div style={{ color: "#888", fontSize: 13 }}>Check-out</div><div style={{ fontWeight: 600 }}>{endISO || "—"}</div></div>
            <div><div style={{ color: "#888", fontSize: 13 }}>Nights</div><div style={{ fontWeight: 600 }}>{nights || "—"}</div></div>
            <div><div style={{ color: "#888", fontSize: 13 }}>Guests</div><div style={{ fontWeight: 600 }}>{numberOfGuests}</div></div>
          </div>
          <hr />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div style={{ color: "#888" }}>Charged now:</div>
            {quoting ? (
              <strong>Getting price…</strong>
            ) : priced ? (
              <strong style={{ fontSize: 26 }}>{money(chargeCurrency, chargeAmount)}</strong>
            ) : (
              <span style={{ color: "#b91c1c" }}>{priceError || "Price unavailable"}</span>
            )}
            {priced && chargeCurrency !== quoteCurrency && (
              <span style={{ color: "#999" }}>(≈ {money(quoteCurrency, sellingPrice)})</span>
            )}
          </div>
        </div>

        {/* Cancellation policy */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 18, marginBottom: 18 }}>
          <b>Cancellation policy:</b>
          {shCancel.nonRefundable && (
            <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 4, background: "#fde8e8", color: "#b91c1c", fontWeight: 700, fontSize: 13 }}>
              Non-refundable
            </span>
          )}
          {shCancel.lines.map((line, i) => (
            <div key={i} style={{ marginTop: 6 }}>{line}</div>
          ))}
          {shCancelForDates && (
            <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 4, background: "#eef6ff", color: "#0b5cad", fontWeight: 600 }}>
              {shCancelForDates.message}
            </div>
          )}
          {shCancel.windows && (
            <ul className="px-4" style={{ marginTop: 6, marginBottom: 0 }}>
              {shCancel.windows.map((w, i) => (<li key={i}>{w.label}</li>))}
            </ul>
          )}
          <div style={{ marginTop: 10 }}>
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">View complete terms &amp; conditions</a>
          </div>
        </div>

        {/* Guest details (free-text) */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 18, marginBottom: 18 }}>
          <h4 style={{ marginTop: 0 }}>Guest details</h4>
          <div className="row">
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>First name *</label>
              <input className="form-control" value={client.firstName} onChange={onField("firstName")} maxLength={60} />
            </div>
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>Last name *</label>
              <input className="form-control" value={client.lastName} onChange={onField("lastName")} maxLength={60} />
            </div>
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>Middle name</label>
              <input className="form-control" value={client.middleName} onChange={onField("middleName")} maxLength={60} />
            </div>
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>E-mail *</label>
              <input type="email" className="form-control" value={client.email} onChange={onField("email")} maxLength={120} />
            </div>
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>Phone *</label>
              <input type="tel" className="form-control" value={client.phone} onChange={onField("phone")} maxLength={18} placeholder="+41 79 123 45 67" />
            </div>
            <div className="col-md-4" style={{ marginBottom: 10 }}>
              <label>Country *</label>
              <input className="form-control" value={client.country} onChange={onField("country")} maxLength={60} />
            </div>
            <div className="col-md-6" style={{ marginBottom: 10 }}>
              <label>Address *</label>
              <input className="form-control" value={client.address} onChange={onField("address")} maxLength={120} />
            </div>
            <div className="col-md-3" style={{ marginBottom: 10 }}>
              <label>City *</label>
              <input className="form-control" value={client.city} onChange={onField("city")} maxLength={60} />
            </div>
            <div className="col-md-3" style={{ marginBottom: 10 }}>
              <label>State / Region</label>
              <input className="form-control" value={client.state} onChange={onField("state")} maxLength={60} />
            </div>
            <div className="col-md-3" style={{ marginBottom: 10 }}>
              <label>Zip / Postal code</label>
              <input className="form-control" value={client.postalCode} onChange={onField("postalCode")} maxLength={20} />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 18, marginBottom: 28 }}>
          <h4 style={{ marginTop: 0 }}>Payment</h4>
          <p style={{ color: "#555" }}>
            Your card is charged immediately for {priced ? <strong>{money(chargeCurrency, chargeAmount)}</strong> : "the booking total"} to confirm this instant booking.
          </p>
          <button className="btn btn-success btn-lg" disabled={!priced || paying} onClick={bookAndPay}>
            {paying ? "Opening secure payment…" : "Pay now — Instant Book"}
          </button>
          {!isBP && (
            <div style={{ color: "#b91c1c", marginTop: 10 }}>
              Instant booking isn’t available for this property.
            </div>
          )}
        </div>

        <TermsFooter />
      </div>
    </div>
  );
};

export default PropertyReservationPage;
