// ---------------------------------------------------------------------------
// src/Util/access.js — what a partner session may open, and whose data.
//
//   node scripts/test-access.mjs
//
// No browser, no network: access.js has no imports, so it runs under node with a
// fake localStorage. Identical copies live in EXTRANET-VT and EXTRANET-SH.
// ---------------------------------------------------------------------------
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const src = readFileSync(fileURLToPath(new URL('../src/Util/access.js', import.meta.url)), 'utf8')
const tmp = join(mkdtempSync(join(tmpdir(), 'access-')), 'access.mjs')
writeFileSync(tmp, src)

const store = new Map()
globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
}
globalThis.window = { location: { search: '' } }
const A = await import(pathToFileURL(tmp).href)

let passed = 0
const t = (name, fn) => {
    try { store.clear(); fn(); passed += 1 } catch (e) { console.error(`FAIL  ${name}\n      ${e.message}`); process.exitCode = 1 }
}
const asPartner = (id, role = 'extranet-vt-logged-in-role') => { store.set('partnerLogin', id); store.set(role, 'partner') }
const asAdmin = (role = 'extranet-vt-logged-in-role') => { store.set(role, 'admin') }

t('THE INCIDENT: a partner on /partners-ru (RU-558318) is sent home to /partners', () => {
    asPartner('RU-558318')
    assert.equal(A.partnerRedirectFor('/partners-ru'), '/partners')
})
t('every admin page redirects a partner home', () => {
    asPartner('RU-558318')
    for (const p of ['/dashboard', '/home', '/admin', '/admin-settings', '/partners-ru-dh', '/partners-guesty-dh', '/partners-hostaway',
        '/partners-bart', '/partners-invenio', '/partners-bookingpal', '/partners-sh', '/partners-vt', '/master-search', '/partner-search',
        '/external-partners', '/eps-listings', '/eps-epartner-manage', '/agoda-listings', '/agoda-booking/123', '/zipcodes-regions-mapping',
        '/duplicated-listings', '/reservations', '/tasks', '/reports', '/shub', '/map', '/hotdestinations', '/propertyEdit', '/listings-bookingpal',
        '/listings-sh-ru-declined-but-listed-on-ru', '/search-listings', '/verify-compare-new-pms', '/request-to-book-flywire', '/nonexistent']) {
        assert.equal(A.partnerRedirectFor(p), '/partners', `${p} was let through`)
    }
})
t('sibling prefixes are not admitted (/partners must not open /partners-ru-dh)', () => {
    asPartner('sh-ru123')
    assert.equal(A.isPartnerAllowedPath('/partners-ru-dh'), false)
    assert.equal(A.isPartnerAllowedPath('/listingsX'), false)
    assert.equal(A.isPartnerAllowedPath('/photos/G-1'), true)
})
t('home by account shape: sh-ru → /partners-ru, sh-bp → /partners-bp, RU-/BP-/G-/hex → /partners', () => {
    assert.equal(A.partnerHomePath('sh-ru438737'), '/partners-ru')
    assert.equal(A.partnerHomePath('sh-bp1'), '/partners-bp')
    for (const id of ['RU-558318', 'BP-1', 'G-6675abc', '65d6068e7b0a1c0012345678']) assert.equal(A.partnerHomePath(id), '/partners')
    assert.equal(A.partnerHomePath(null), '/login')
})
t('a partner on another partner-type home page is sent to their own', () => {
    asPartner('sh-ru438737')
    assert.equal(A.partnerRedirectFor('/partners'), '/partners-ru')
    assert.equal(A.partnerRedirectFor('/partners-bp'), '/partners-ru')
    assert.equal(A.partnerRedirectFor('/partners-ru'), null)
})
t('public auth pages stay open for a partner session', () => {
    asPartner('RU-558318')
    for (const p of ['/login', '/qr', '/forgotPassword', '/verifycode/x', '/resetpassword/x', '/signup', '/welcome', '/signupthanks', '/terms-and-conditions']) {
        assert.equal(A.partnerRedirectFor(p), null, p)
    }
})
t('listings pages: own account passes, another partner\'s account is sent home', () => {
    asPartner('RU-558318')
    assert.equal(A.partnerRedirectFor('/listings', undefined, '?accountId=RU-558318'), null)
    assert.equal(A.partnerRedirectFor('/listings', undefined, '?accountId=sh-ru438737'), '/partners')
    store.set('partner', JSON.stringify({ accountId: 'sh-ru438737' }))
    assert.equal(A.partnerRedirectFor('/listings', undefined, ''), '/partners', 'stored other partner let through')
    store.set('partner', JSON.stringify({ accountId: 'RU-558318' }))
    assert.equal(A.partnerRedirectFor('/listings-ru', undefined, ''), null)
    store.delete('partner')
    assert.equal(A.partnerRedirectFor('/listings', undefined, ''), '/partners', 'no account at all must not load a list')
})
t('same-email twins are owned once remembered; others never', () => {
    asPartner('RU-558318')
    A.rememberPartnerAccounts(['RU-558318', 'G-6675twin'])
    assert.equal(A.partnerOwnsAccount('G-6675twin'), true)
    assert.equal(A.partnerOwnsAccount('RU-558318'), true)
    assert.equal(A.partnerOwnsAccount('sh-ru438737'), false)
    assert.equal(A.partnerOwnsAccount(''), false)
})
t('admin sessions are never redirected and own everything', () => {
    asAdmin()
    for (const p of ['/partners-ru', '/dashboard', '/master-search', '/listings']) assert.equal(A.partnerRedirectFor(p, undefined, '?accountId=anyone'), null)
    assert.equal(A.partnerOwnsAccount('sh-ru438737'), true)
})
t('a stale role key cannot turn an admin into a partner, but partnerLogin always means partner', () => {
    asAdmin(); store.set('extranet-sh-logged-in-role', 'partner')
    assert.equal(A.isPartnerSession(), false)
    store.clear(); store.set('extranet-vt-logged-in-role', 'admin'); store.set('partnerLogin', 'RU-1')
    assert.equal(A.isPartnerSession(), true)
    store.clear(); store.set('extranet-vt-logged-in-role', 'partner')
    assert.equal(A.isPartnerSession(), true)
    assert.equal(A.partnerRedirectFor('/dashboard'), '/login', 'role partner without an account id → login')
})

console.log(`\n${passed} assertions passed${process.exitCode ? ' — WITH FAILURES ABOVE' : ''}`)
if (!process.exitCode) console.log('extranet access OK')
process.exit(process.exitCode || 0)
