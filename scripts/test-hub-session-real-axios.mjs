// ---------------------------------------------------------------------------
// src/Util/hubSession.js against this app's REAL axios (node_modules) with a capturing
// adapter — no network. Asana 1218458529003876. Identical in EXTRANET-VT, EXTRANET-SH,
// SHUB-FE and VT-FE.
//
//   node scripts/test-hub-session-real-axios.mjs
// ---------------------------------------------------------------------------
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const app = resolve(process.argv[2] || fileURLToPath(new URL('..', import.meta.url)))
const axiosEntry = pathToFileURL(join(app, 'node_modules/axios/index.js')).href
const dir = mkdtempSync(join(tmpdir(), 'realaxios-'))
writeFileSync(join(dir, 'hubSession.mjs'), readFileSync(join(app, 'src/Util/hubSession.js'), 'utf8').replace(/import axios from 'axios'/, `import axios from '${axiosEntry}'`))

const store = new Map()
globalThis.localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) }
globalThis.window = { location: { origin: 'https://extra.villatracker.com' }, fetch: async () => ({ ok: true, json: async () => ({}) }) }
const H = await import(pathToFileURL(join(dir, 'hubSession.mjs')).href)
const axios = (await import(axiosEntry)).default

const HUB = 'https://api.villatracker.com'
const seen = []
const adapter = async (config) => {
  const h = typeof config.headers.toJSON === 'function' ? config.headers.toJSON() : config.headers
  seen.push({ url: config.url, baseURL: config.baseURL, headers: { ...h } })
  return { data: {}, status: 200, statusText: 'OK', headers: {}, config, request: {} }
}
axios.defaults.adapter = adapter
const later = (ms) => new Date(Date.now() + ms).toISOString()
const auth = (h) => Object.entries(h).filter(([k]) => ['authorization', 'x-api-key', 'token'].includes(k.toLowerCase()))

H.setHubSession(HUB, { token: 'SESS', expiresAt: later(30 * 864e5), role: 'partner' })

// 1. module-level instance with placeholder Authorization (ShubAuth style)
const inst = axios.create({ baseURL: HUB, headers: { Authorization: 'Bearer __HUB_SESSION__' }, adapter })
await inst.get('local/partners?accountId=RU-1')
assert.deepEqual(auth(seen.at(-1).headers), [['Authorization', 'Bearer SESS']])

// 2. default axios, per-request x-api-key placeholder + global VT-Backend Authorization
axios.defaults.headers.common.Authorization = 'Bearer VTBE'
await axios.get(`${HUB}/local/listings?ids=1`, { headers: { 'x-api-key': '__HUB_SESSION__' } })
assert.deepEqual(auth(seen.at(-1).headers), [['Authorization', 'Bearer SESS']])

// 3. VT-Backend call through default axios untouched
await axios.get('https://backend.villatracker.com/agent/get-profile', { headers: { token: 'Bearer JT' } })
assert.deepEqual(auth(seen.at(-1).headers).sort(), [['Authorization', 'Bearer VTBE'], ['token', 'Bearer JT']].sort())
delete axios.defaults.headers.common.Authorization

// 4. lowercase authorization with SHUB_TOKEN constant, POST
await axios.post(`${HUB}/local/destinations`, { a: 1 }, { headers: { authorization: 'Bearer __HUB_SESSION__', 'Content-Type': 'application/json' } })
assert.deepEqual(auth(seen.at(-1).headers), [['Authorization', 'Bearer SESS']])

// 5. instance created with defaults mutated afterwards (PhotoManager X-Actor)
const pm = axios.create({ baseURL: HUB, headers: { Authorization: 'Bearer __HUB_SESSION__' }, adapter })
pm.defaults.headers['X-Actor'] = 'partner:RU-1'
await pm.post('/local/listing-images/hide', {})
assert.deepEqual(auth(seen.at(-1).headers), [['Authorization', 'Bearer SESS']])
assert.equal(seen.at(-1).headers['X-Actor'], 'partner:RU-1')

// 6. other hub with no session: placeholder stripped, no credential sent
await axios.get('https://api.triangle.luxury/xchange', { headers: { Authorization: 'Bearer __HUB_SESSION__' } })
assert.deepEqual(auth(seen.at(-1).headers), [])

// ---------------------------------------------------------------------------
// The one replay (Asana 1218810480646362). A hub READ that went out without a usable
// session must not leave the page empty once a session can be had.
// ---------------------------------------------------------------------------
H.clearHubSession()
const REPLAY_HUB = 'https://replay.example'
let statuses = []
let exchangeToken = null
const replayAdapter = async (config) => {
  const h = typeof config.headers.toJSON === 'function' ? config.headers.toJSON() : config.headers
  seen.push({ url: config.url, headers: { ...h } })
  const status = statuses.length ? statuses.shift() : 200
  const response = { data: { ok: status === 200 }, status, statusText: '', headers: {}, config, request: {} }
  // A custom adapter has to settle for itself — axios only applies validateStatus inside
  // its own xhr/http adapters.
  if (status >= 400) {
    const err = new Error(`Request failed with status code ${status}`)
    err.config = config; err.response = response; err.isAxiosError = true
    throw err
  }
  return response
}
axios.defaults.adapter = replayAdapter
// The session exchange: the hub is down for the first attempt (as during a restart) and
// answers from the second on — exactly the window that produced the empty page.
let exchangeCalls = 0
const exchangeDownThenUp = async () => {
  exchangeCalls += 1
  if (exchangeCalls === 1) return { ok: false, status: 503, json: async () => ({}) }
  return { ok: true, status: 200, json: async () => ({ token: exchangeToken, expiresAt: later(12 * 3600e3) }) }
}
// Both: the transport calls window.__hubOriginalFetch (captured when it installed).
const useExchange = (fn) => { globalThis.window.fetch = fn; globalThis.window.__hubOriginalFetch = fn }
useExchange(exchangeDownThenUp)

// 7. GET 400 with no session → replayed once, with the session the retry obtained
seen.length = 0; statuses = [400, 200]; exchangeToken = 'SESS2'; exchangeCalls = 0
store.set('extranet-vt-logged-in-role', 'admin'); store.set('jToken', 'jwt')
const replayed = await axios.get(`${REPLAY_HUB}/local/external-partners`, { headers: { Authorization: 'Bearer __HUB_SESSION__' } })
assert.equal(replayed.status, 200, 'the caller sees the successful replay, not the 400')
assert.equal(seen.length, 2, `${seen.length} requests, expected the original plus one replay`)
assert.deepEqual(auth(seen[0].headers), [], 'the first attempt carried no credential')
assert.deepEqual(auth(seen[1].headers), [['Authorization', 'Bearer SESS2']])

// A real request always crosses a macrotask, so the coalescing cache in once() has lapsed
// before the next one starts; these cases have to say so explicitly.
const tick = () => new Promise((r) => setTimeout(r, 0))

// 8. a WRITE is never replayed — it may already have landed on the hub
await tick(); H.clearHubSession(); seen.length = 0; statuses = [400, 200]; exchangeToken = 'SESS3'; exchangeCalls = 0
const HUB8 = 'https://replay8.example'
await assert.rejects(
  axios.post(`${HUB8}/local/update/RU-1`, { a: 1 }, { headers: { Authorization: 'Bearer __HUB_SESSION__' } }),
  (e) => e.response.status === 400,
)
assert.equal(seen.length, 1, 'the POST was sent once and not repeated')

// 9. at most ONE replay: a second failure is the caller's to handle
await tick(); H.clearHubSession(); seen.length = 0; statuses = [400, 400]; exchangeToken = 'SESS4'; exchangeCalls = 0
const HUB9 = 'https://replay9.example'
await assert.rejects(
  axios.get(`${HUB9}/local/external-partners`, { headers: { Authorization: 'Bearer __HUB_SESSION__' } }),
  (e) => e.response.status === 400,
)
assert.equal(seen.length, 2, 'one original, one replay, then it gives up')

// 10. a 401 while holding a session the hub still accepts is NOT replayed (no new token)
const HUB10 = 'https://replay10.example'
await tick(); H.setHubSession(HUB10, { token: 'GOOD', expiresAt: later(12 * 3600e3), role: 'admin' })
seen.length = 0; statuses = [401]
useExchange(async () => ({ ok: true, status: 200, json: async () => ({ token: 'GOOD', expiresAt: later(12 * 3600e3), role: 'admin' }) }))
await assert.rejects(
  axios.get(`${HUB10}/local/external-partners`, { headers: { Authorization: 'Bearer __HUB_SESSION__' } }),
  (e) => e.response.status === 401,
)
assert.equal(seen.length, 1, 'the route said 401, the session is fine — nothing to retry')

// 11. a DECLINED exchange (4xx) is NOT waited for: the read fails fast rather than hanging
//     on a hub that is refusing us for the next minute.
const HUB11 = 'https://replay11.example'
await tick(); H.clearHubSession(); seen.length = 0; statuses = [400, 200]
useExchange(async () => ({ ok: false, status: 429, json: async () => ({}) }))
const startedAt = Date.now()
await assert.rejects(
  axios.get(`${HUB11}/local/external-partners`, { headers: { Authorization: 'Bearer __HUB_SESSION__' } }),
  (e) => e.response.status === 400,
)
assert.equal(seen.length, 1, 'no replay — there is no session to be had')
assert.ok(Date.now() - startedAt < 500, `gave up in ${Date.now() - startedAt} ms, should not wait out a refusal`)

console.log(`${app}: axios ${JSON.parse(readFileSync(join(app, 'node_modules/axios/package.json'))).version} real-axios transport OK (11 cases)`)
