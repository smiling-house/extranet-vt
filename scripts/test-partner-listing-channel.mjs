// src/Util/partnerListingChannel.js — node scripts/test-partner-listing-channel.mjs (Asana 1218719984465196)
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const dir = mkdtempSync(join(tmpdir(), 'plc-'))
writeFileSync(join(dir, 'm.mjs'), readFileSync(fileURLToPath(new URL('../src/Util/partnerListingChannel.js', import.meta.url)), 'utf8'))
const { partnerListingChannel } = await import(pathToFileURL(join(dir, 'm.mjs')).href)

for (const hub of ['VT', 'SH']) {
  assert.equal(partnerListingChannel('G', hub), hub)
  assert.equal(partnerListingChannel('RU', hub), hub)
  assert.equal(partnerListingChannel('HW', hub), 'Hostaway')
  // A SiteMinder hotel's rooms are stamped channelSource 'SiteMinder' by the hub's
  // SiteConnect worker; matching on 'SM' would count none of them and the hotel would
  // see "No listings found" on its own extranet.
  assert.equal(partnerListingChannel('SM', hub), 'SiteMinder')
  for (const s of ['VT', 'SH', 'BP', 'EX', 'AG', 'Hostaway', 'SiteMinder', 'VillasInStBarth', '', undefined]) assert.equal(partnerListingChannel(s, hub), s)
}
console.log('partner listing channel OK')
