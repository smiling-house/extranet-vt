// ---------------------------------------------------------------------------
// src/Util/hubSession.js — hub calls carry a server-issued session, never a bundled token.
//
//   node scripts/test-hub-session.mjs
//
// Offline: the module is copied to a temp .mjs with axios replaced by a tiny stub, and runs
// against fake window / localStorage / fetch. Identical copies live in EXTRANET-VT,
// EXTRANET-SH, SHUB-FE and VT-FE.
// ---------------------------------------------------------------------------
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const src = readFileSync(fileURLToPath(new URL('../src/Util/hubSession.js', import.meta.url)), 'utf8')
const dir = mkdtempSync(join(tmpdir(), 'hubsession-'))
writeFileSync(join(dir, 'axios.mjs'), `
const mk = () => ({ interceptors: { request: { handlers: [], use(fn) { this.handlers.push(fn) } }, response: { handlers: [], use(ok, fail) { this.handlers.push({ ok, fail }) } } } })
const axios = mk()
axios.create = (cfg) => { const i = mk(); i.defaults = cfg; return i }
export default axios
`)
writeFileSync(join(dir, 'hubSession.mjs'), src.replace(/import axios from 'axios'/, "import axios from './axios.mjs'"))

const store = new Map()
globalThis.localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) }
const calls = []
let fetchReply = () => ({ ok: true, json: async () => ({ token: 'sess-public', expiresAt: new Date(Date.now() + 3600e3).toISOString() }) })
globalThis.window = { location: { origin: 'https://extra.villatracker.com' }, fetch: async (url, init) => { calls.push({ url, init }); return fetchReply(url, init) } }
const H = await import(pathToFileURL(join(dir, 'hubSession.mjs')).href)
const axios = (await import(pathToFileURL(join(dir, 'axios.mjs')).href)).default

let passed = 0
const t = async (name, fn) => {
  try { store.clear(); calls.length = 0; H.configureHubSessions({ publicSessions: false, isAdminLogin: null }); await fn(); passed += 1 }
  catch (e) { console.error(`FAIL  ${name}\n      ${e.message}`); process.exitCode = 1 }
}
const HUB = 'https://api.villatracker.com'
const later = (ms) => new Date(Date.now() + ms).toISOString()

await t('placeholder Authorization → Bearer <session>', () => {
  const r = H.rewriteCredentialHeaders({ Authorization: 'Bearer __HUB_SESSION__', 'Content-Type': 'x' }, 'abc')
  assert.deepEqual(r.headers, { Authorization: 'Bearer abc', 'Content-Type': 'x' })
})
await t('placeholder x-api-key and token headers are removed and replaced by one Authorization', () => {
  const r = H.rewriteCredentialHeaders({ 'x-api-key': '__HUB_SESSION__', authorization: 'Bearer some-vtbe-token' }, 'abc')
  assert.deepEqual(r.headers, { Authorization: 'Bearer abc' })
  assert.deepEqual(H.rewriteCredentialHeaders({ token: '__HUB_SESSION__' }, 'abc').headers, { Authorization: 'Bearer abc' })
})
await t('headers without the placeholder are never touched (VT-Backend, EPS, Guesty tokens)', () => {
  const h = { Authorization: 'Bearer real-partner-token', token: 'Bearer jtoken' }
  assert.deepEqual(H.rewriteCredentialHeaders(h, 'abc'), { headers: h, found: false })
})
await t('no session: the placeholder is stripped, nothing bundled is ever sent', () => {
  assert.deepEqual(H.rewriteCredentialHeaders({ Authorization: 'Bearer __HUB_SESSION__' }, null).headers, {})
})
await t('stored partner session for the hub origin is used; other hubs are separate', async () => {
  H.setHubSession(HUB, { token: 'p1', expiresAt: later(40 * 864e5), role: 'partner' })
  assert.equal(await H.ensureHubSession(`${HUB}/local/listings?x=1`), 'p1')
  assert.equal(await H.ensureHubSession('https://api.triangle.luxury/local/listings'), null)
  assert.equal(H.hasPartnerSession(), true)
})
await t('expired session is ignored', async () => {
  H.setHubSession(HUB, { token: 'old', expiresAt: new Date(Date.now() - 1000).toISOString(), role: 'partner' })
  assert.equal(H.getHubSession(HUB), null)
  assert.equal(await H.ensureHubSession(HUB), null)
})
await t('admin with a VT-Backend token is exchanged once, via Authorization Bearer', async () => {
  store.set('extranet-vt-logged-in-role', 'admin'); store.set('jToken', 'vtbe-jwt')
  fetchReply = () => ({ ok: true, json: async () => ({ token: 'adm', expiresAt: later(12 * 3600e3) }) })
  const [a, b] = await Promise.all([H.ensureHubSession(HUB), H.ensureHubSession(HUB)])
  assert.equal(a, 'adm'); assert.equal(b, 'adm')
  const ex = calls.filter((c) => c.url.endsWith('/local/extranet/session/admin'))
  assert.equal(ex.length, 1, `${ex.length} exchanges`)
  assert.equal(ex[0].init.headers.Authorization, 'Bearer vtbe-jwt')
  assert.equal(H.getHubSession(HUB).role, 'admin')
})
await t('a partner (partnerLogin set) is never exchanged as admin', async () => {
  store.set('extranet-vt-logged-in-role', 'admin'); store.set('jToken', 'shared-agent'); store.set('partnerLogin', 'RU-1')
  assert.equal(await H.ensureHubSession(HUB), null)
  assert.equal(calls.length, 0)
})
await t('public sessions only when configured (VT-FE)', async () => {
  assert.equal(await H.ensureHubSession(HUB), null)
  H.configureHubSessions({ publicSessions: true })
  fetchReply = () => ({ ok: true, json: async () => ({ token: 'pub', expiresAt: later(3600e3) }) })
  assert.equal(await H.ensureHubSession(HUB), 'pub')
  assert.ok(calls.some((c) => c.url === `${HUB}/local/extranet/session/public`))
})
const ageSession = (origin, ms) => {
  const all = JSON.parse(store.get('hubSessions')); all[origin].receivedAt -= ms; store.set('hubSessions', JSON.stringify(all))
}
await t('a fresh session is NOT renewed on every request (12 h admin session, first hours)', async () => {
  const O = 'https://fresh.example'
  H.setHubSession(O, { token: 'adm', expiresAt: later(12 * 3600e3), role: 'admin' })
  for (let i = 0; i < 5; i++) assert.equal(await H.ensureHubSession(O), 'adm')
  assert.equal(calls.filter((c) => c.url.endsWith('/session/renew')).length, 0)
})
await t('past half its lifetime a session is renewed once in the background', async () => {
  H.setHubSession(HUB, { token: 'soon', expiresAt: later(5 * 3600e3), role: 'admin' })
  ageSession(HUB, 7 * 3600e3)
  fetchReply = () => ({ ok: true, json: async () => ({ token: 'renewed', expiresAt: later(12 * 3600e3), role: 'admin' }) })
  assert.equal(await H.ensureHubSession(HUB), 'soon')
  assert.equal(await H.ensureHubSession(HUB), 'soon')
  await new Promise((r) => setTimeout(r, 10))
  assert.equal(H.getHubSession(HUB).token, 'renewed')
  assert.equal(calls.filter((c) => c.url.endsWith('/session/renew')).length, 1)
})
await t('a long partner session slides: renewed once it is a day old, not before', async () => {
  const O = 'https://slide.example'
  H.setHubSession(O, { token: 'p', expiresAt: later(365 * 864e5), role: 'partner' })
  ageSession(O, 20 * 3600e3)
  await H.ensureHubSession(O)
  assert.equal(calls.filter((c) => c.url.startsWith(O)).length, 0)
  ageSession(O, 5 * 3600e3)
  fetchReply = () => ({ ok: true, json: async () => ({ token: 'p2', expiresAt: later(365 * 864e5), role: 'partner' }) })
  await H.ensureHubSession(O)
  await new Promise((r) => setTimeout(r, 10))
  assert.equal(H.getHubSession(O).token, 'p2')
})
await t('a failed renew is retried at most every 5 minutes; a renew 401 drops the session', async () => {
  const O = 'https://renewfail.example'
  H.setHubSession(O, { token: 'x', expiresAt: later(365 * 864e5), role: 'partner' })
  ageSession(O, 2 * 864e5)
  fetchReply = () => { throw new Error('network') }
  await H.ensureHubSession(O); await new Promise((r) => setTimeout(r, 10))
  await H.ensureHubSession(O); await new Promise((r) => setTimeout(r, 10))
  assert.equal(calls.filter((c) => c.url === `${O}/local/extranet/session/renew`).length, 1)
  assert.equal(H.getHubSession(O).token, 'x')
  const O2 = 'https://renewgone.example'
  H.setHubSession(O2, { token: 'y', expiresAt: later(365 * 864e5), role: 'partner' })
  ageSession(O2, 2 * 864e5)
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({ success: false }) })
  await H.ensureHubSession(O2); await new Promise((r) => setTimeout(r, 10))
  assert.equal(H.getHubSession(O2), null)
})
await t('axios.create instances and the default instance get the request interceptor', async () => {
  const inst = axios.create({ baseURL: HUB })
  assert.equal(inst.interceptors.request.handlers.length, 1)
  assert.equal(axios.interceptors.request.handlers.length, 1)
  H.setHubSession(HUB, { token: 'p9', expiresAt: later(40 * 864e5), role: 'partner' })
  const cfg = await inst.interceptors.request.handlers[0]({ baseURL: HUB, url: 'local/partners', headers: { Authorization: 'Bearer __HUB_SESSION__' } })
  assert.equal(cfg.headers.Authorization, 'Bearer p9')
})
await t('window.fetch is wrapped: placeholder swapped, other fetches untouched', async () => {
  H.setHubSession(HUB, { token: 'f1', expiresAt: later(40 * 864e5), role: 'partner' })
  fetchReply = () => ({ ok: true, json: async () => ({}) })
  await window.fetch(`${HUB}/sync-villainstbarth-progress`, { headers: { Authorization: 'Bearer __HUB_SESSION__', 'x-api-key': '__HUB_SESSION__' } })
  await window.fetch('https://backend.villatracker.com/agent/get-profile', { headers: { token: 'Bearer jt' } })
  const [hubCall, beCall] = calls.slice(-2)
  assert.deepEqual(hubCall.init.headers, { Authorization: 'Bearer f1' })
  assert.deepEqual(beCall.init.headers, { token: 'Bearer jt' })
})
await t('a refused admin exchange is not retried for 60 s (hub rate-limits exchanges per IP)', async () => {
  const O = 'https://refused.example'
  store.set('extranet-vt-logged-in-role', 'admin'); store.set('jToken', 'stale-jwt')
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({ success: false }) })
  assert.equal(await H.ensureHubSession(O), null)
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(await H.ensureHubSession(O), null)
  assert.equal(await H.ensureHubSession(`${O}/local/partners`), null)
  assert.equal(calls.filter((c) => c.url === `${O}/local/extranet/session/admin`).length, 1)
})
await t('401 on a session the hub says is invalid (/renew 401) → session dropped', async () => {
  const O = 'https://invalid.example'
  H.setHubSession(O, { token: 'dead', expiresAt: later(20 * 864e5), role: 'partner' })
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({ success: false }) })
  await H.checkSessionAfter401(O, 'dead')
  assert.equal(H.getHubSession(O), null)
  const renew = calls.filter((c) => c.url === `${O}/local/extranet/session/renew`)
  assert.equal(renew.length, 1); assert.equal(renew[0].init.headers.Authorization, 'Bearer dead')
})
await t('401 from a route while the session is valid (/renew 200) → session kept (nobody logged out)', async () => {
  const O = 'https://valid.example'
  H.setHubSession(O, { token: 'live', expiresAt: later(20 * 864e5), role: 'partner' })
  fetchReply = () => ({ ok: true, status: 200, json: async () => ({ token: 'live2', expiresAt: later(30 * 864e5), role: 'partner' }) })
  await H.checkSessionAfter401(O, 'live')
  assert.equal(H.getHubSession(O).token, 'live2')
})
await t('hub unreachable during the check → session kept; checks are capped at one per minute per hub', async () => {
  const O = 'https://down.example'
  H.setHubSession(O, { token: 'keep', expiresAt: later(20 * 864e5), role: 'admin' })
  fetchReply = () => { throw new Error('network') }
  await H.checkSessionAfter401(O, 'keep')
  assert.equal(H.getHubSession(O).token, 'keep')
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({}) })
  await H.checkSessionAfter401(O, 'keep')
  assert.equal(H.getHubSession(O).token, 'keep')
})
await t('axios 401 on a request that carried a session triggers the check; 403 does not', async () => {
  const O = 'https://axios401.example'
  const inst = axios.create({ baseURL: O })
  H.setHubSession(O, { token: 'ax', expiresAt: later(20 * 864e5), role: 'partner' })
  const cfg = await inst.interceptors.request.handlers[0]({ baseURL: O, url: 'local/partners', headers: { Authorization: 'Bearer __HUB_SESSION__' } })
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({}) })
  const fail = inst.interceptors.response.handlers[0].fail
  await assert.rejects(fail({ config: cfg, response: { status: 403 } }))
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(H.getHubSession(O).token, 'ax')
  await assert.rejects(fail({ config: cfg, response: { status: 401 } }))
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(H.getHubSession(O), null)
  assert.equal(axios.interceptors.response.handlers.length, 1)
})
await t('fetch 401 on a request that carried a session triggers the check', async () => {
  const O = 'https://fetch401.example'
  H.setHubSession(O, { token: 'fx', expiresAt: later(20 * 864e5), role: 'admin' })
  fetchReply = () => ({ ok: false, status: 401, json: async () => ({}) })
  const res = await window.fetch(`${O}/local/partners`, { headers: { Authorization: 'Bearer __HUB_SESSION__' } })
  assert.equal(res.status, 401)
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(H.getHubSession(O), null)
})
await t('a logged-in admin holding a public session gets the admin exchange (public kept only while refused)', async () => {
  const O = 'https://pub2adm.example'
  H.configureHubSessions({ publicSessions: true })
  H.setHubSession(O, { token: 'pub', expiresAt: later(12 * 3600e3), role: 'public' })
  store.set('extranet-vt-logged-in-role', 'admin'); store.set('jToken', 'adm-jwt')
  fetchReply = () => ({ ok: false, status: 502, json: async () => ({}) })
  assert.equal(await H.ensureHubSession(O), 'pub')
  assert.equal(await H.ensureHubSession(O), 'pub')
  assert.equal(calls.filter((c) => c.url === `${O}/local/extranet/session/admin`).length, 1)
  const O2 = 'https://pub2adm-ok.example'
  H.setHubSession(O2, { token: 'pub', expiresAt: later(12 * 3600e3), role: 'public' })
  fetchReply = () => ({ ok: true, status: 200, json: async () => ({ token: 'adm', expiresAt: later(12 * 3600e3) }) })
  assert.equal(await H.ensureHubSession(O2), 'adm')
  assert.equal(H.getHubSession(O2).role, 'admin')
})
await t('a partner or anonymous visitor keeps a stored public session (no exchange)', async () => {
  const O = 'https://pubkeep.example'
  H.configureHubSessions({ publicSessions: true })
  H.setHubSession(O, { token: 'pub', expiresAt: later(12 * 3600e3), role: 'public' })
  store.set('partnerLogin', 'RU-1'); store.set('extranet-vt-logged-in-role', 'partner')
  assert.equal(await H.ensureHubSession(O), 'pub')
  assert.equal(calls.length, 0)
})
await t('clearHubSession() clears every hub', () => {
  H.setHubSession(HUB, { token: 'a', role: 'admin' }); H.setHubSession('https://api.triangle.luxury', { token: 'b', role: 'admin' })
  H.clearHubSession()
  assert.equal(H.getHubSession(HUB), null); assert.equal(H.getHubSession('https://api.triangle.luxury'), null)
})

console.log(`\n${passed} assertions passed${process.exitCode ? ' — WITH FAILURES ABOVE' : ''}`)
if (!process.exitCode) console.log('hub session transport OK')
process.exit(process.exitCode || 0)
