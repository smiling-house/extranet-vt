// ---------------------------------------------------------------------------
// src/Util/hostawayConnect.js — the Hostaway connect form sends the partner's email,
// so the hub creates their Extranet login and sends the onboarding email.
//
//   node scripts/test-hostaway-connect.mjs
//
// Offline. Identical in EXTRANET-VT and EXTRANET-SH. Asana 1218719984465196.
// ---------------------------------------------------------------------------
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const src = readFileSync(fileURLToPath(new URL('../src/Util/hostawayConnect.js', import.meta.url)), 'utf8')
const dir = mkdtempSync(join(tmpdir(), 'hwconnect-'))
writeFileSync(join(dir, 'hostawayConnect.mjs'), src)
const H = await import(pathToFileURL(join(dir, 'hostawayConnect.mjs')).href)

let passed = 0
const t = (name, fn) => {
  try { fn(); passed += 1 } catch (e) { console.error(`FAIL  ${name}\n      ${e.message}`); process.exitCode = 1 }
}
const base = { accountId: '40343', clientSecret: '  s3cret  ', vtAccountId: ' ', email: ' Yanis@PremiumBooking.ca ', pmName: ' Premium Booking ' }

t('valid form → body carries email (lowercased, trimmed) and pmName, as the hub expects', () => {
  const r = H.buildHostawayConnectPayload(base)
  assert.equal(r.ok, true)
  assert.deepEqual(r.payload, { accountId: 40343, clientSecret: 's3cret', vtAccountId: '', email: 'yanis@premiumbooking.ca', pmName: 'Premium Booking' })
})
t('accountId and clientSecret rules are unchanged from the old form', () => {
  for (const accountId of ['', '0', '-3', '12.5', 'abc']) assert.equal(H.buildHostawayConnectPayload({ ...base, accountId }).field, 'accountId', accountId)
  for (const clientSecret of ['', '   ', undefined]) assert.equal(H.buildHostawayConnectPayload({ ...base, clientSecret }).field, 'clientSecret')
})
t('email is required and must be one valid address (no login without it)', () => {
  for (const email of ['', '   ', 'nope', 'a@b', 'a@b.c, d@e.f', 'a b@c.de', undefined, null]) {
    const r = H.buildHostawayConnectPayload({ ...base, email })
    assert.equal(r.ok, false, String(email)); assert.equal(r.field, 'email')
  }
})
t('pmName is optional and never undefined in the body', () => {
  assert.equal(H.buildHostawayConnectPayload({ ...base, pmName: undefined }).payload.pmName, '')
})
t('same normalisation as the hub helper (hostawayPartnerUser.normalizePartnerEmail)', () => {
  assert.equal(H.normalizePartnerEmail(' A@B.CO '), 'a@b.co')
  assert.equal(H.normalizePartnerEmail('a@b.co;c@d.co'), null)
  assert.equal(H.hwAccountId(40343), 'HW-40343'); assert.equal(H.hwAccountId('HW-40343'), 'HW-40343'); assert.equal(H.hwAccountId(''), '')
})
t('existing login with a DIFFERENT email is a conflict (the hub would create a second row)', () => {
  assert.deepEqual(H.existingLoginConflict([{ email: 'old@x.com' }], 'new@x.com'), { conflict: true, existingEmails: ['old@x.com'] })
})
t('same email (any case), no rows, or rows without email are not a conflict', () => {
  assert.equal(H.existingLoginConflict([{ email: 'Yanis@PremiumBooking.ca' }], 'yanis@premiumbooking.ca').conflict, false)
  assert.equal(H.existingLoginConflict([], 'a@b.co').conflict, false)
  assert.equal(H.existingLoginConflict(null, 'a@b.co').conflict, false)
  assert.equal(H.existingLoginConflict([{ email: '' }, {}], 'a@b.co').conflict, false)
})

console.log(`\n${passed} passed${process.exitCode ? ' — WITH FAILURES ABOVE' : ''}`)
if (!process.exitCode) console.log('hostaway connect form OK')
