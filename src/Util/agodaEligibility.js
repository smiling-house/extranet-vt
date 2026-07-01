// -------------------------------------------------
// Agoda pushability check for a VT listing.
// Mirrors the rules used to build Agoda-distribution-match.csv so the live
// picker and the offline export agree. A listing is "pushable" when it is an
// active Guesty listing carrying the minimum content Agoda needs (price,
// currency, geo, address, capacity, photos, availability).
//
// Note: the list feed (/local/listings) may omit fullCalendar for payload
// size. We treat a MISSING calendar as "unknown" (not a blocker) and only
// block on an explicitly empty calendar, to avoid false negatives in the UI.
// The authoritative calendar check lives in the offline export.
// -------------------------------------------------

export const AGODA_REASON_LABELS = {
  'not-active': 'Listing not active',
  'no-price': 'No base price',
  'no-currency': 'No currency',
  'no-geo': 'Missing lat/lng',
  'no-address': 'Missing address',
  'no-capacity': 'No guest capacity',
  'no-bedrooms': 'No bedroom count',
  'no-photos': 'No photos',
  'no-calendar': 'Empty calendar',
}

export function agodaBlockingReasons(listing) {
  const reasons = []
  if (!listing) return ['not-matched']
  const d = listing.data || {}
  const a = d.address || {}

  if (listing.isActive !== true) reasons.push('not-active')
  if (!(Number(d.prices?.basePrice) > 0)) reasons.push('no-price')
  if (!d.prices?.currency) reasons.push('no-currency')
  if (!(a.lat && a.lng)) reasons.push('no-geo')
  if (!a.full) reasons.push('no-address')
  if (!(Number(d.accommodates) > 0)) reasons.push('no-capacity')
  if (d.bedrooms == null) reasons.push('no-bedrooms')
  if (!((d.pictures?.length || 0) >= 1)) reasons.push('no-photos')
  // calendar: only block when we actually received an empty array
  if (Array.isArray(listing.fullCalendar) && listing.fullCalendar.length === 0) {
    reasons.push('no-calendar')
  }
  return reasons
}

export function isAgodaPushable(listing) {
  return agodaBlockingReasons(listing).length === 0
}

export function isAgodaConfigured(listing) {
  return !!(listing?.xdata?.agoda)
}

export function isAgodaEnabled(listing) {
  return listing?.xdata?.agoda?.enabled === true
}
