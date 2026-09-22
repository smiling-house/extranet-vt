// ---------------------------------------------------------------------------
// Which listings.channelSource a partner's listings live under, from the partner row's
// `source`. Asana 1218719984465196. Identical in EXTRANET-VT and EXTRANET-SH; the hubs
// have the same rule (api/utils/partnerListingChannel.js).
//   - G- / RU- partners: the hub's own channel (VT on VTHub, SH on SHub).
//   - Hostaway partners (source 'HW'): the Hostaway sync stamps channelSource "Hostaway".
//   - Everyone else: their source.
// Pure: no imports (scripts/test-partner-listing-channel.mjs).
// ---------------------------------------------------------------------------
export const partnerListingChannel = (source, hubChannel) => {
  if (source === 'G' || source === 'RU') return hubChannel
  if (source === 'HW') return 'Hostaway'
  return source
}

export default partnerListingChannel
