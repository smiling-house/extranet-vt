// -----------------------------------------------------------------------
// Shared "on demand" / QOD predicate (twin of VT-FE + extranet-sh).
//
// An on-demand (a.k.a. QOD / "Quote on demand") listing has NO advertised
// price — show "Price on request", never a number. The signal lives in the
// listing tags (hub aliases xdata.tags -> tags) as any synonym below, and/or a
// top-level QOD:true boolean. Ops tag inconsistently, so match all, case-insens.
// -----------------------------------------------------------------------
export const ON_DEMAND_SYNONYMS = ["ondemand", "qod", "quote on demand"];

const tagsAreOnDemand = (tags) =>
  Array.isArray(tags) &&
  tags.some((t) => ON_DEMAND_SYNONYMS.includes(String(t).trim().toLowerCase()));

// Accepts a listing object (with .tags / .xdata.tags / .QOD), a { QOD, tags }
// shape (the Listings rows), or a bare tags array.
export function isOnDemandListing(input) {
  if (!input) return false;
  if (Array.isArray(input)) return tagsAreOnDemand(input);
  if (input.QOD === true) return true;
  return tagsAreOnDemand(input.tags) || tagsAreOnDemand(input?.xdata?.tags);
}

export default isOnDemandListing;
