// ---------------------------------------------------------------------------
// Hub session — browser apps talk to the hubs with SERVER-ISSUED session tokens,
// never with a token shipped in the bundle. Asana 1218458529003876.
// Keep byte-identical in EXTRANET-VT, EXTRANET-SH, SHUB-FE and VT-FE.
//
// Contract with the hubs (VTHub api.villatracker.com, SHub api.triangle.luxury):
//   POST /local/extranet/session/partner  {email, accountId}         → {success, token, expiresAt, partner, vtbe?}
//   POST /local/extranet/session/admin    Authorization: Bearer <VT-Backend jToken> → {success, token, expiresAt}
//   POST /local/extranet/session/public   (no credentials)            → {success, token, expiresAt}
//   POST /local/extranet/session/renew    Authorization: Bearer <session> → {success, token, expiresAt, role}
// Sessions are per hub (each hub signs its own), stored under the hub's origin.
//
// Every existing hub call keeps reading `ShubAuth` / `constants.SHUB_TOKEN` / an x-api-key
// constant — those now hold the PLACEHOLDER below. installHubSessionTransport() runs
// before any other module (first import in src/index.js), wraps axios.create, the default
// axios instance and window.fetch, and swaps the placeholder for the session of the hub the
// request goes to, at request time. Requests without the placeholder are never touched
// (VT-Backend tokens, EPS partner bearers, Guesty tokens).
//
// Which session a request gets, in order:
//   1. a stored, unexpired session for that hub (partner or admin, from login);
//   2. admin logged in (VT-Backend jToken) → exchanged once for an admin session;
//   3. configureHubSessions({ publicSessions: true }) (VT-FE) → a public session;
//   4. otherwise none — the request goes out without credentials and fails like any
//      unauthenticated call (a partner is sent to /login once by the app).
// ---------------------------------------------------------------------------
import axios from 'axios'

export const HUB_SESSION_PLACEHOLDER = '__HUB_SESSION__'
const STORE_KEY = 'hubSessions'
const ROLE_KEYS = ['extranet-vt-logged-in-role', 'extranet-sh-logged-in-role']
const CRED_HEADERS = ['authorization', 'token', 'x-api-key']
const RENEW_BEFORE_MS = 24 * 60 * 60 * 1000

let config = { publicSessions: false, isAdminLogin: null }
/** App-level options. isAdminLogin: () => boolean overrides the extranet role-key check. */
export const configureHubSessions = (opts) => { config = { ...config, ...(opts || {}) } }

const read = (k) => { try { return localStorage.getItem(k) } catch (e) { return null } }
const originOf = (url) => { try { return new URL(url, window.location.origin).origin } catch (e) { return null } }

const readAll = () => { try { return JSON.parse(read(STORE_KEY) || '{}') || {} } catch (e) { return {} } }
const writeAll = (all) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(all)) } catch (e) { /* storage blocked */ } }

/** The stored session for a hub (base URL or origin), or null when missing or expired. */
export const getHubSession = (hubUrl) => {
    const origin = originOf(hubUrl)
    const s = origin && readAll()[origin]
    if (!s || !s.token) return null
    if (s.expiresAt && Date.parse(s.expiresAt) <= Date.now()) return null
    return s
}

export const setHubSession = (hubUrl, session) => {
    const origin = originOf(hubUrl)
    if (!origin || !session || !session.token) return
    const all = readAll()
    all[origin] = { token: session.token, expiresAt: session.expiresAt || null, role: session.role || null }
    writeAll(all)
}

/** Clear one hub's session, or all of them. */
export const clearHubSession = (hubUrl) => {
    if (!hubUrl) { try { localStorage.removeItem(STORE_KEY) } catch (e) { /* ignore */ } return }
    const origin = originOf(hubUrl)
    const all = readAll(); delete all[origin]; writeAll(all)
}

/** True when any stored session is a partner session (used to send a partner to /login once). */
export const hasPartnerSession = () => Object.values(readAll()).some((s) => s && s.role === 'partner' && (!s.expiresAt || Date.parse(s.expiresAt) > Date.now()))

const isAdminLogin = () => {
    if (typeof config.isAdminLogin === 'function') { try { return !!config.isAdminLogin() } catch (e) { return false } }
    return ROLE_KEYS.some((k) => read(k) === 'admin') && !read('partnerLogin')
}

const rawFetch = (...args) => (window.__hubOriginalFetch || window.fetch)(...args)
const postSession = async (origin, path, headers) => {
    try {
        const res = await rawFetch(`${origin}/local/extranet/session/${path}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', ...(headers || {}) }, body: '{}',
        })
        const data = await res.json().catch(() => ({}))
        return res.ok && data && data.token ? data : null
    } catch (e) { return null }
}

const inflight = {}
const once = (key, fn) => {
    if (!inflight[key]) inflight[key] = fn().finally(() => { setTimeout(() => { delete inflight[key] }, 0) })
    return inflight[key]
}

/** A valid session token for the hub a request goes to, or null. Never throws. */
export const ensureHubSession = async (hubUrl) => {
    const origin = originOf(hubUrl)
    if (!origin) return null
    const s = getHubSession(origin)
    if (s) {
        if (s.expiresAt && Date.parse(s.expiresAt) - Date.now() < RENEW_BEFORE_MS) {
            once(`renew:${origin}`, async () => {
                const d = await postSession(origin, 'renew', { Authorization: `Bearer ${s.token}` })
                if (d) setHubSession(origin, { token: d.token, expiresAt: d.expiresAt, role: d.role || s.role })
            })
        }
        return s.token
    }
    const jToken = read('jToken')
    if (isAdminLogin() && jToken) {
        const token = await once(`admin:${origin}`, async () => {
            const d = await postSession(origin, 'admin', { Authorization: `Bearer ${jToken}` })
            if (d) { setHubSession(origin, { token: d.token, expiresAt: d.expiresAt, role: 'admin' }); return d.token }
            return null
        })
        if (token) return token
    }
    if (config.publicSessions) {
        return once(`public:${origin}`, async () => {
            const d = await postSession(origin, 'public')
            if (d) { setHubSession(origin, { token: d.token, expiresAt: d.expiresAt, role: 'public' }); return d.token }
            return null
        })
    }
    return null
}

const hasPlaceholder = (v) => typeof v === 'string' && v.includes(HUB_SESSION_PLACEHOLDER)

/**
 * Pure header rewrite (exported for tests). Returns {headers, found}. Credential headers
 * carrying the placeholder are removed; if any was present and a token is available,
 * `Authorization: Bearer <token>` is set. Headers without the placeholder are untouched.
 */
export const rewriteCredentialHeaders = (headers, token) => {
    const out = { ...(headers || {}) }
    let found = false
    for (const key of Object.keys(out)) {
        if (CRED_HEADERS.includes(key.toLowerCase()) && hasPlaceholder(out[key])) { delete out[key]; found = true }
    }
    if (found && token) {
        // One Authorization header only: a call that paired the placeholder x-api-key with
        // some other Authorization (e.g. a VT-Backend token the hub never checked) now
        // carries the hub session.
        for (const key of Object.keys(out)) if (key.toLowerCase() === 'authorization') delete out[key]
        out.Authorization = `Bearer ${token}`
    }
    return { headers: out, found }
}

const axiosTarget = (cfg) => {
    try { return new URL(cfg.url || '', cfg.baseURL || window.location.origin).href } catch (e) { return cfg.baseURL || '' }
}

const axiosRequestInterceptor = async (cfg) => {
    const h = cfg.headers || {}
    const source = typeof h.toJSON === 'function' ? h.toJSON() : h
    const flat = {}
    for (const k of Object.keys(source)) if (typeof source[k] === 'string') flat[k] = source[k]
    if (!Object.keys(flat).some((k) => CRED_HEADERS.includes(k.toLowerCase()) && hasPlaceholder(flat[k]))) return cfg
    const token = await ensureHubSession(axiosTarget(cfg))
    const { headers } = rewriteCredentialHeaders(flat, token)
    for (const k of Object.keys(flat)) {
        if (!(k in headers)) { if (typeof h.delete === 'function') h.delete(k); else delete h[k] }
    }
    if (headers.Authorization) { if (typeof h.set === 'function') h.set('Authorization', headers.Authorization); else h.Authorization = headers.Authorization }
    return cfg
}

let installed = false
export const installHubSessionTransport = () => {
    if (installed || typeof window === 'undefined') return
    installed = true
    axios.interceptors.request.use(axiosRequestInterceptor)
    const origCreate = axios.create.bind(axios)
    axios.create = (cfg) => {
        const inst = origCreate(cfg)
        inst.interceptors.request.use(axiosRequestInterceptor)
        return inst
    }
    if (typeof window.fetch === 'function') {
        const origFetch = window.fetch.bind(window)
        window.__hubOriginalFetch = origFetch
        window.fetch = async (input, init) => {
            if (!init || !init.headers) return origFetch(input, init)
            const flat = {}
            if (Array.isArray(init.headers)) init.headers.forEach(([k, v]) => { flat[k] = v })
            else if (typeof init.headers.forEach === 'function') init.headers.forEach((v, k) => { flat[k] = v })
            else Object.assign(flat, init.headers)
            if (!Object.keys(flat).some((k) => CRED_HEADERS.includes(k.toLowerCase()) && hasPlaceholder(flat[k]))) return origFetch(input, init)
            const url = typeof input === 'string' ? input : (input && input.url) || ''
            const token = await ensureHubSession(url)
            return origFetch(input, { ...init, headers: rewriteCredentialHeaders(flat, token).headers })
        }
    }
}

installHubSessionTransport()
