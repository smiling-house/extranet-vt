// ---------------------------------------------------------------------------
// Which listings.channelSource a partner's listings live under, from the partner row's
// `source`. Asana 1218719984465196. Identical in EXTRANET-VT and EXTRANET-SH; the hubs
// have the same rule (api/utils/partnerListingChannel.js).
//   - G- / RU- partners: the hub's own channel (VT on VTHub, SH on SHub).
//   - Hostaway partners (source 'HW'): the Hostaway sync stamps channelSource "Hostaway".
//   - SiteMinder hotels (source 'SM'): the SiteConnect worker stamps channelSource
//     "SiteMinder", so matching on 'SM' counts none of the hotel's rooms and shows its
//     own account as inactive with "No listings found" — the Hostaway bug again.
//   - Everyone else: their source.
// Pure: no imports (scripts/test-partner-listing-channel.mjs).
// ---------------------------------------------------------------------------
export const partnerListingChannel = (source, hubChannel) => {
  if (source === 'G' || source === 'RU') return hubChannel
  if (source === 'HW') return 'Hostaway'
  if (source === 'SM') return 'SiteMinder'
  return source
}

export default partnerListingChannel
