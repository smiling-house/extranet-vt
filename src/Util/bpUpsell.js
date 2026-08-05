// -------------------------------------------------
// BookingPal up-sell pricing for the extranet reserve flow.
//
// Given the BP get-quote NET total N (from the hub /bookingpal-price-preview),
// the guest-facing SELLING price is the same pinned markup VT-FE uses in
// makeCalculations.jsx (BP branch): ceil( ceil(N) / 0.86 ). The divider is
// PINNED — do NOT reuse the extranet's accountId-keyed makeCalculations
// divider, which resolves to 0.78 for BP docs. BP_PINNED_DIVIDER must equal
// VTHub/SHub pricingPolicy BP_DIVIDER (0.86); they must move together.
//
// The channel booking gets the NET; the guest is charged the SELLING price.
// A refundable security deposit (if any) is FX-converted elsewhere and never
// marked up here.
// -------------------------------------------------
export const BP_PINNED_DIVIDER = 0.86;

// Extract the NET total + currency from a BookingPal Get-Quote response as
// returned by the hub's Bearer /local/bookingpal/quote (AuthService.bpQuote →
// { success, result: <BP /v2/quote> }). Mirrors the hub's extractQuotePricing
// field priority so the displayed/charged price matches what the hub re-quotes
// at booking time. Returns { net, currency } (net = 0 if the shape is
// unrecognized — caller should block the pay button on net <= 0).
export function extractBpQuoteNet(quoteResponse) {
  const r = quoteResponse?.result || quoteResponse?.data || quoteResponse || {};
  const feeArray = Array.isArray(r.quote) ? r.quote
    : Array.isArray(r.fees) ? r.fees
    : Array.isArray(r.price?.fees) ? r.price.fees
    : [];
  const sumFees = feeArray.reduce((acc, f) => {
    // Sum non-included line amounts as a last-resort total.
    if (f && f.included) return acc;
    const a = Number(f?.amount);
    return Number.isFinite(a) ? acc + a : acc;
  }, 0);
  const net = Number(
    r.total ?? r.original_total ?? r.total_price ?? r.totalPrice ?? r.price?.total ?? (sumFees > 0 ? sumFees : undefined)
  );
  const currency = String(r.currency ?? r.price?.currency ?? "USD").toUpperCase();
  return { net: Number.isFinite(net) ? net : 0, currency };
}

export function bpUpsell(net, { securityDeposit = 0 } = {}) {
  const bpNetCeiled = Math.ceil(Number(net) || 0);          // pre-ceil (hub parity)
  const sellingPrice = Math.ceil(bpNetCeiled / BP_PINNED_DIVIDER); // ceil(ceil(N)/0.86)
  return {
    net: bpNetCeiled,
    sellingPrice,                                            // == amount charged
    agencyCommission: sellingPrice / 10,
    securityDeposit: Number(securityDeposit) || 0,
  };
}
