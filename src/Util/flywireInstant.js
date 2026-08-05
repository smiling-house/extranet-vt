// -------------------------------------------------
// Flywire INSTANT checkout for the extranet BookingPal reserve flow.
// Port of VT-FE PropertyReserve buildFlywireConfig, INSTANT variant ONLY
// (never sets paymentAuthorization → the classic checkout CHARGES immediately;
// pre-auth/hold is intentionally absent). Per-repo values (callbackUrl,
// recipients, env) come from constants — this file is byte-identical across
// the VT and SH extranets.
// -------------------------------------------------
import constants from "./constants";

export function loadFlywireSDK() {
  return new Promise((resolve, reject) => {
    if (window.FlywirePayment) return resolve();
    const s = document.createElement("script");
    s.src = "https://payment.flywire.com/sdk/v1/flywire.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Error loading Flywire SDK"));
    document.body.appendChild(s);
  });
}

// Convert a native-currency amount to USD via the extranet's stored rates
// (localStorage.exchangeRatesData = { [code]: { conversion_rates } }, units per
// 1 USD). Returns null when the rate is missing so the caller can block.
function toUSD(amount, currency) {
  if (currency === "USD") return Math.round(amount);
  let fx = {};
  try { fx = JSON.parse(localStorage.getItem("exchangeRatesData") || "{}"); } catch (e) { fx = {}; }
  const rate = fx?.[currency]?.conversion_rates;
  if (!rate) return null;
  return Math.round(amount / rate);
}

// Resolve what the guest is ACTUALLY charged and in which currency. Each prod
// portal is single-currency (USD/CHF/EUR), so those charge in the native
// currency; any other currency (or the demo SHE portal) routes to the USD
// portal and is converted. Returns { amount, chargeCurrency, recipientCode }.
// amount is null when a non-USD/CHF/EUR currency has no FX rate (caller blocks).
// The reservation-of-record MUST store this amount/currency (not the native
// sellingPrice) so the record matches the charge.
export function resolveFlywireCharge(sellingPrice, currency) {
  const env = constants.FLYWIRE_ENV;
  const recipients = constants.FLYWIRE_RECIPIENTS[env] || constants.FLYWIRE_RECIPIENTS.prod;
  const recipientCode = recipients[currency] || recipients.USD;
  const isNativePortal = env === "prod" && ["USD", "CHF", "EUR"].includes(currency);
  if (isNativePortal) {
    return { amount: Math.round(Number(sellingPrice)), chargeCurrency: currency, recipientCode };
  }
  return { amount: toUSD(Number(sellingPrice), currency), chargeCurrency: "USD", recipientCode };
}

// Build the INSTANT Flywire config. callbackId = "BP<uuid>" is the Flywire
// external_reference — the join key the webhook (VT-BE for VT, SHub for SH)
// matches the payment against. amount/currency come from resolveFlywireCharge.
export function buildInstantConfig({ callbackId, sellingPrice, currency, guest, returnUrl, onSuccess, onError }) {
  const { amount, recipientCode } = resolveFlywireCharge(sellingPrice, currency);

  return {
    env: constants.FLYWIRE_ENV,
    recipientCode,
    amount,
    returnUrl,
    firstName: guest?.firstName,
    lastName: guest?.lastName,
    email: guest?.email,
    phone: guest?.phone,
    requestPayerInfo: true,
    requestRecipientInfo: true,
    payment_method: { type: "card" },
    callbackId,
    callbackUrl: constants.FLYWIRE_CALLBACK_URL,
    callbackVersion: "2",
    recipientFields: { booking_reference: callbackId },
    nonce: callbackId,
    onSuccess: (data) => { if (typeof onSuccess === "function") onSuccess(data); },
    onInvalidInput: (errors) => { (errors || []).forEach((e) => console.error(e?.msg || "Invalid payment input")); },
    onCancel: () => { if (typeof onError === "function") onError("cancel"); },
    // INSTANT ⇒ paymentAuthorization is intentionally OMITTED (VT-FE parity).
  };
}
