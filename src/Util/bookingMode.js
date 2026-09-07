// ---------------------------------------------------------------------------
// Booking modes (D6) — the extranet's copy of the hub's vocabulary.
//
// Decided by Tom, 7 Sep 2026. Mirrors SHub/VTHub api/utils/bookingMode.js and
// SH-Frontend src/lib/inventory/booking-mode.ts deliberately: same three modes,
// same precedence, same legacy bridge. A copy rather than an import because
// these are four separate deployments. If you change one, change them all — the
// hub's copy is the one that validates writes.
//
//   enquiry               "Request to book"     card pre-authorised, team accepts
//   instant_confirmation  "Confirmed instantly" card HELD, concierge within 1h
//   instant_book          "Book instantly"      card CHARGED, no human step
//
// THE LEGACY BOOLEAN. `instantBook` is still written by the hub, derived as
// `mode === 'instant_book'`. Reads go the other way: a mode STRING wins, and
// where there is none the boolean reads as instant_book / enquiry. So
// instant_confirmation derives `instantBook: false` — deliberate, because SHub
// services/scheduledPayment.service.js gates the 50/50 payment flow on that
// boolean AND on authType === 'direct'. Never send `instantBook: true` for
// instant_confirmation to anything.
// ---------------------------------------------------------------------------

export const MODES = ['enquiry', 'instant_confirmation', 'instant_book']

export const DEFAULT_MODE = 'enquiry'

/** Membership, never `typeof === 'string'`: a typo'd mode stored as an override
 *  would be a permanent silent pin no screen offers a way to clear. */
export const isMode = (v) => typeof v === 'string' && MODES.indexOf(v) > -1

export const modeToBool = (mode) => mode === 'instant_book'

export const boolToMode = (b) => (b === true ? 'instant_book' : b === false ? 'enquiry' : null)

/** What ONE scope says — a listing's xdata, or the partner doc. Null = inherit. */
export function scopeMode(holder) {
  if (isMode(holder?.bookingMode)) return holder.bookingMode
  return boolToMode(typeof holder?.instantBook === 'boolean' ? holder.instantBook : null)
}

/** Short label for a mode, for pills and option text. */
export const MODE_LABEL = {
  enquiry: 'Request to book',
  instant_confirmation: 'Instant confirmation',
  instant_book: 'Instant Book',
}

/** What each mode actually promises the guest — shown under the dropdown so a
 *  partner is choosing a behaviour rather than a word. The money sentence is the
 *  one that matters: it is the difference partners ask about. */
export const MODE_HELP = {
  enquiry: 'Guests send a request. Their card is pre-authorised and your team accepts before anything is charged.',
  instant_confirmation: 'The dates are secured immediately and the card is HELD, never charged. A concierge calls the guest within the hour, and payment is taken only after that.',
  instant_book: 'The booking completes on its own: the card is CHARGED and the reservation is created with no human step.',
}

/** The dropdown options for the ACCOUNT level (no inherit — this IS the default). */
export const ACCOUNT_OPTIONS = MODES.map((m) => ({ value: m, label: MODE_LABEL[m] }))

/**
 * The dropdown options for ONE LISTING. The first is "inherit", whose label
 * names what inheriting currently resolves to, so a partner can see the
 * consequence without opening another screen.
 */
export const listingOptions = (partnerMode) => [
  { value: '', label: `Inherit account (${MODE_LABEL[partnerMode || DEFAULT_MODE]})` },
  ...ACCOUNT_OPTIONS,
]

const BOOKABLE_SOURCES = ['G', 'RU', 'BP', 'HW']

export function detectSource(hubId, fallbackSource) {
  const id = String(hubId || '')
  if (id.startsWith('G-')) return 'G'
  if (id.startsWith('RU-')) return 'RU'
  if (id.startsWith('BP-')) return 'BP'
  if (id.startsWith('HW-')) return 'HW'
  return String(fallbackSource || '') || null
}

/**
 * Resolve the booking mode for one listing, exactly as the hub does.
 *
 * @param {object}  args.xdata    listing xdata (carries bookingMode / instantBook when overridden)
 * @param {object}  args.partner  partner doc (carries the account default)
 * @param {string}  args.hubId    hub listing id
 * @param {string} [args.source]  fallback source when the id has no prefix
 */
export function bookingModeState({ xdata, partner, hubId, source }) {
  const override = scopeMode(xdata)
  const partnerDefault = scopeMode(partner)
  const effective = override || partnerDefault || DEFAULT_MODE
  const src = detectSource(hubId, source)
  const bookable = BOOKABLE_SOURCES.indexOf(src) > -1

  const label = override
    ? MODE_LABEL[override]
    : `Inherits account (${MODE_LABEL[effective]})`

  return {
    override,                     // 'enquiry' | 'instant_confirmation' | 'instant_book' | null
    partnerDefault,               // same, or null when the account has set nothing
    effective,                    // never null
    bookable,
    source: src,
    label,
    // A non-enquiry mode on a source with no reservation API is stored but inert.
    // BOTH instant modes create a reservation, so both need one — not just
    // instant_book.
    inert: effective !== DEFAULT_MODE && !bookable,
    tone: effective === 'instant_book' ? 'on' : effective === 'instant_confirmation' ? 'info' : 'inherit',
    setAt: xdata?.bookingModeSetAt || xdata?.instantBookSetAt || null,
    setBy: xdata?.bookingModeSetBy || xdata?.instantBookSetBy || null,
  }
}

/** Account-level label for page headers. */
export function partnerBookingModeLabel(partner) {
  const m = scopeMode(partner)
  return m ? `Booking mode: ${MODE_LABEL[m]}` : 'Booking mode: not set (Request to book)'
}
