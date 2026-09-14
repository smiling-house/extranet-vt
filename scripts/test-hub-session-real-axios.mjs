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

console.log(`${app}: axios ${JSON.parse(readFileSync(join(app, 'node_modules/axios/package.json'))).version} real-axios transport OK (6 cases)`)
