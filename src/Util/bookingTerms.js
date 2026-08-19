// Format the normalized booking-terms envelope (listing `data.bookingTerms`,
// produced by the hubs' api/services/bookingTerms.js and backfilled across
// VTHUB + SHUB) into display-ready strings for the property detail page and the
// brochure. Pure/deterministic — no network, no FX, no markup. Every field is
// `null` when absent so callers can fall back to generic copy. Byte-identical
// across VT-FE + the two extranets (like the other duplicated client utils).

// Every code that appears in the data or that the backend bucketer
// (api/services/bookingTerms.js cancellationCodeFromWindows) can emit must have a
// label here, else buildCancellation falls back to an ugly capitalize (e.g. "Strict_60").
const CANCELLATION_LABELS = {
  flexible: 'Flexible',
  flex: 'Flexible',
  semi_flexible: 'Semi-Flexible',
  moderate: 'Moderate',
  semi_moderate: 'Semi-Moderate',
  firm: 'Firm',
  strict: 'Strict',
  strict_60: 'Strict (60 days)',
  super_strict: 'Super Strict',
  super_strict_30: 'Super Strict (30 days)',
  super_strict_60: 'Super Strict (60 days)',
  free: 'Free / Fully refundable',
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

// True when the partner policy refunds nothing at any point (implicit — there is
// no canonical marker: derive from code/text or all-penalty windows).
export function detectNonRefundable(cancellation) {
  if (!cancellation) return false;
  const hay = `${cancellation.code || ''} ${cancellation.text || ''}`;
  if (/non[\s-]?refundable/i.test(hay)) return true;
  const w = cancellation.windows;
  if (Array.isArray(w) && w.length && w.every((x) => Number(x.penaltyPct) >= 100)) return true;
  return false;
}

// Guest-facing Smiling House cancellation policy copy: partner terms for
// cancellations 30+ days before check-in, plus the standard "within 30 days,
// min 50% of the accommodation total is non-refundable" condition; non-refundable
// properties get a distinct single line. Returns { nonRefundable, lines[],
// partnerText, windows } so callers render + badge consistently.
export function smilingHouseCancellationCopy(bt) {
  const t = formatBookingTerms(bt);
  const nonRefundable = detectNonRefundable(bt && bt.cancellation);
  if (nonRefundable) {
    return {
      nonRefundable: true,
      lines: ['This property is non-refundable — no refund is available after booking.'],
      partnerText: t.cancellationText,
      windows: t.cancellationWindows,
    };
  }
  return {
    nonRefundable: false,
    lines: [
      t.cancellationText
        ? `Cancellations 30 or more days before check-in follow this property's terms: ${t.cancellationText}.`
        : "Cancellations 30 or more days before check-in follow this property's own cancellation terms.",
      'For cancellations less than 30 days before check-in, a minimum of 50% of the accommodation total is non-refundable (or the property’s terms, if stricter).',
    ],
    partnerText: t.cancellationText,
    windows: t.cancellationWindows,
  };
}

// Date-aware cancellation outcome for a SELECTED check-in date (cancel moment =
// now). Mirrors the backend refund engine's window-pick + SH overlay so a guest
// sees which condition applies for their dates. Indicative for display only
// (code-only partner terms are treated as fully refundable; the 50% floor still
// caps within 30 days). Returns null when there is no valid date.
export function cancellationForDates(bt, checkInDate) {
  if (!checkInDate) return null;
  const checkIn = new Date(checkInDate);
  if (isNaN(checkIn.getTime())) return null;
  const now = new Date();
  const daysOut = Math.round(
    (Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()) -
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000
  );
  const cx = bt && bt.cancellation;
  const nonRefundable = detectNonRefundable(cx);
  let partnerPct = 100;
  if (nonRefundable) partnerPct = 0;
  else if (cx && Array.isArray(cx.windows) && cx.windows.length) {
    for (const w of cx.windows) {
      const from = Number(w.fromDays);
      const to = w.toDays == null ? Infinity : Number(w.toDays);
      if (daysOut >= from && daysOut < to) {
        partnerPct = Math.max(0, Math.min(100, 100 - Number(w.penaltyPct)));
        break;
      }
    }
  }
  const guestPct = daysOut >= 30 ? partnerPct : Math.min(partnerPct, 50);
  return {
    daysOut,
    guestPct,
    nonRefundable,
    within30: daysOut < 30,
    message: nonRefundable
      ? 'This booking is non-refundable — no refund applies for your selected dates.'
      : daysOut >= 30
        ? `Your check-in is ${daysOut} days away: the property's own cancellation terms apply (currently about ${guestPct}% refundable).`
        : `Your check-in is ${daysOut} days away (under 30): a minimum of 50% of the accommodation total is non-refundable — currently about ${guestPct}% refundable.`,
  };
}

export default formatBookingTerms;
