// ---------------------------------------------------------------------------
// Instant-book state resolution — mirrors the hub's model exactly
// (SHub api/controllers/instantBook.js):
//
//   override        xdata.instantBook   (per-listing; boolean or ABSENT)
//   partnerDefault  users.instantBook   (account level; boolean or ABSENT)
//   effective     = override ?? partnerDefault ?? false
//
// THREE-STATE: `false` is an explicit OFF, absent means "inherit the account
// default". The label must show all three, so partners can tell an explicit
// OFF apart from "nobody set anything".
//
// `bookable`: a flag on a source without a reservation API (legacy
// guesty_channel_api) is stored but inert — the listing stays enquiry-only.
// Source detection is by hub-id prefix, same as the hub; the hub listing id
// equals listing.data._id for every source (verified against live data).
// ---------------------------------------------------------------------------

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
 * @param {object} args
 * @param {object} args.xdata    listing xdata (has instantBook when overridden)
 * @param {object} args.partner  partner/user doc (has instantBook when a default is set)
 * @param {string} args.hubId    hub listing id (listing.data._id)
 * @param {string} [args.source] fallback source when the id has no prefix
 */
export function instantBookState({ xdata, partner, hubId, source }) {
  const override = typeof xdata?.instantBook === 'boolean' ? xdata.instantBook : null
  const partnerDefault = typeof partner?.instantBook === 'boolean' ? partner.instantBook : null
  const effective = override !== null ? override : (partnerDefault !== null ? partnerDefault : false)
  const src = detectSource(hubId, source)
  const bookable = BOOKABLE_SOURCES.indexOf(src) > -1

  let label, tone
  if (override === true) { label = 'Instant Book: ON'; tone = 'on' }
  else if (override === false) { label = 'Instant Book: OFF'; tone = 'off' }
  else { label = `Instant Book: inherits account (${effective ? 'ON' : 'OFF'})`; tone = effective ? 'on' : 'inherit' }

  return {
    override, partnerDefault, effective, bookable, source: src, label, tone,
    // effective but on a non-reservable source → the flag is inert
    inert: effective && !bookable,
    setAt: xdata?.instantBookSetAt || null,
    setBy: xdata?.instantBookSetBy || null,
  }
}

/** Account-level label for page headers. */
export function partnerInstantBookLabel(partner) {
  const d = typeof partner?.instantBook === 'boolean' ? partner.instantBook : null
  if (d === true) return 'Instant Book default: ON'
  if (d === false) return 'Instant Book default: OFF'
  return 'Instant Book default: not set (OFF)'
}
