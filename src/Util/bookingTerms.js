// Format the normalized booking-terms envelope (listing `data.bookingTerms`,
// produced by the hubs' api/services/bookingTerms.js and backfilled across
// VTHUB + SHUB) into display-ready strings for the property detail page and the
// brochure. Pure/deterministic — no network, no FX, no markup. Every field is
// `null` when absent so callers can fall back to generic copy. Byte-identical
// across VT-FE + the two extranets (like the other duplicated client utils).

const CANCELLATION_LABELS = {
  flexible: 'Flexible',
  moderate: 'Moderate',
  strict: 'Strict',
  firm: 'Firm',
  super_strict_30: 'Super Strict (30 days)',
  super_strict_60: 'Super Strict (60 days)',
  non_refundable: 'Non-refundable',
  nonRefundable: 'Non-refundable',
};

const cap = (s) =>
  typeof s === 'string' && s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

function fmtWindow(w) {
  if (!w) return null;
  const pct = Number(w.penaltyPct);
  const from = Number(w.fromDays);
  const to = w.toDays == null ? null : Number(w.toDays);
  const pctPart = Number.isFinite(pct) ? `${pct}% penalty` : 'penalty applies';
  if (Number.isFinite(from) && to != null && Number.isFinite(to)) {
    return `${to}–${from} days before arrival: ${pctPart}`;
  }
  if (Number.isFinite(from)) {
    return `Within ${from} days of arrival: ${pctPart}`;
  }
  return pctPart;
}

function buildCancellation(c) {
  if (!c) return { text: null, windows: null };
  const windows =
    Array.isArray(c.windows) && c.windows.length
      ? c.windows.map(fmtWindow).filter(Boolean).map((label) => ({ label }))
      : null;
  // Prefer human text (DH), else the windows summary, else the policy-code label.
  let text = typeof c.text === 'string' && c.text.trim() ? c.text.trim() : null;
  if (!text && windows) text = windows.map((w) => w.label).join('; ');
  if (!text && c.code) text = CANCELLATION_LABELS[c.code] || cap(String(c.code));
  return { text: text || null, windows };
}

function buildDeposit(d) {
  if (!d || d.amount == null || !(Number(d.amount) > 0)) return null;
  const amount = Number(d.amount);
  const currency = d.currency || '';
  const kind = d.type === 'booking' ? 'Booking deposit' : 'Security deposit';
  const refundable =
    d.refundable === true
      ? ' (refundable)'
      : d.refundable === false
      ? ' (non-refundable)'
      : '';
  const amountText = `${amount.toLocaleString()} ${currency}`.trim();
  return {
    text: `${kind}: ${amountText}${refundable}`,
    amount,
    currency,
    type: d.type || null,
    refundable: d.refundable,
  };
}

function fmtScheduleRow(row) {
  if (!row) return null;
  const isPct =
    row.chargeType === 'PERCENTAGE' ||
    row.chargeType === 'percent' ||
    row.chargeType === 'PERCENT';
  const amt =
    row.amount != null ? (isPct ? `${row.amount}%` : `${row.amount}`) : null;
  const whenVal = row?.when?.value;
  const whenCtx = row?.when?.context;
  let when = '';
  if (whenCtx === 'AT_RESERVATION' || whenCtx === 'BOOKING' || whenVal === 0) {
    when = 'at booking';
  } else if (whenVal != null && whenCtx) {
    const n = Number(whenVal);
    when = `${Math.abs(n)} days ${n < 0 ? 'before' : 'after'} ${String(whenCtx)
      .toLowerCase()
      .replace(/_/g, ' ')}`;
  } else if (whenCtx) {
    when = String(whenCtx).toLowerCase().replace(/_/g, ' ');
  }
  const label = [amt, when].filter(Boolean).join(' ');
  return label ? { label: cap(label) } : null;
}

const EMPTY = {
  hasAny: false,
  cancellationText: null,
  cancellationWindows: null,
  depositText: null,
  deposit: null,
  paymentSchedule: null,
  checkIn: null,
  checkOut: null,
  checkInEnd: null,
  minNights: null,
  maxNights: null,
  leadDays: null,
  houseRulesText: null,
};

export function formatBookingTerms(bt) {
  if (!bt || typeof bt !== 'object') return { ...EMPTY };
  const cancellation = buildCancellation(bt.cancellation);
  const deposit = buildDeposit(bt.deposit);
  const schedule =
    Array.isArray(bt.paymentSchedule) && bt.paymentSchedule.length
      ? bt.paymentSchedule.map(fmtScheduleRow).filter(Boolean)
      : null;
  const houseRulesText =
    typeof bt.houseRules === 'string' && bt.houseRules.trim()
      ? bt.houseRules.trim()
      : null;
  const out = {
    cancellationText: cancellation.text,
    cancellationWindows: cancellation.windows,
    depositText: deposit ? deposit.text : null,
    deposit,
    paymentSchedule: schedule && schedule.length ? schedule : null,
    checkIn: bt.checkIn || null,
    checkOut: bt.checkOut || null,
    checkInEnd: bt.checkInEnd || null,
    minNights: bt.minNights == null ? null : bt.minNights,
    maxNights: bt.maxNights == null ? null : bt.maxNights,
    leadDays: bt.leadDays == null ? null : bt.leadDays,
    houseRulesText,
  };
  out.hasAny = !!(
    out.cancellationText ||
    out.depositText ||
    out.paymentSchedule ||
    out.houseRulesText ||
    out.checkIn ||
    out.checkOut
  );
  return out;
}

export default formatBookingTerms;
