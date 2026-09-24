// ---------------------------------------------------------------------------
// Hub session — browser apps talk to the hubs with SERVER-ISSUED session tokens,
// never with a token shipped in the bundle. Asana 1218458529003876.
//
// FOUR COPIES: EXTRANET-VT, EXTRANET-SH, SHUB-FE, VT-FE. They were byte-identical until
// Asana 1218810480646362 added the one-replay and the refusal-backoff rules below.
// EXTRANET-VT and EXTRANET-SH now carry those; SHUB-FE and VT-FE are BEHIND and must be
// brought forward — never the reverse. Copying an older copy over this one silently
// removes the replay and reintroduces the bug (a hub blip rendering as an empty list).
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
// A refused admin/public exchange is not retried for REFUSAL_BACKOFF_MS (the hub
// rate-limits exchanges per IP) — but only when the hub actually refused us; a hub that is
// restarting or unreachable is retried on the next request. When a request that carried a
// session gets a 401, the session is checked once with /renew: only if the hub says it is
// invalid is it dropped (a route that 401s for another reason never logs anyone out).
// A hub GET that failed 400/401 for want of a session is re-sent ONCE after one is
// obtained, so a blip cannot leave a list page looking empty until the user reloads.
// ---------------------------------------------------------------------------
import axios from 'axios'

export const HUB_SESSION_PLACEHOLDER = '__HUB_SESSION__'
const STORE_KEY = 'hubSessions'
const ROLE_KEYS = ['extranet-vt-logged-in-role', 'extranet-sh-logged-in-role']
const CRED_HEADERS = ['authorization', 'token', 'x-api-key']
// Renew once a session is past half its lifetime, and at least daily for long sessions
// (partner sessions slide while the partner keeps using the app). At most one renew
// attempt per RENEW_RETRY_MS per hub.
const RENEW_AFTER_MAX_MS = 24 * 60 * 60 * 1000
const RENEW_RETRY_MS = 5 * 60 * 1000
const REFUSAL_BACKOFF_MS = 60 * 1000
// A hub that is down gets a short pause, not the refusal backoff: long enough that a
// restarting hub is not hit by every call on every open tab, short enough that one failed
// read waits it out and repairs itself (waitForSession below).
const DOWN_BACKOFF_MS = 2 * 1000
const CHECK_INTERVAL_MS = 60 * 1000

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
    all[origin] = { token: session.token, expiresAt: session.expiresAt || null, role: session.role || null, receivedAt: Date.now() }
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
const postSessionRaw = async (origin, path, headers) => {
    try {
        const res = await rawFetch(`${origin}/local/extranet/session/${path}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', ...(headers || {}) }, body: '{}',
        })
        const data = await res.json().catch(() => ({}))
        return { status: res.status, data: res.ok && data && data.token ? data : null }
    } catch (e) { return { status: 0, data: null } }
}

const inflight = {}
// Concurrent callers share one exchange. A FAILED one is dropped as soon as it settles
// rather than a tick later, so the caller that reacts to the failure (the replay below)
// starts a fresh attempt instead of being handed the failure again. What stops a retry
// storm is refusedUntil, not this cache.
const once = (key, fn) => {
    if (!inflight[key]) {
        inflight[key] = fn()
            .then((v) => { if (!v) delete inflight[key]; return v }, (e) => { delete inflight[key]; throw e })
            .finally(() => { setTimeout(() => { delete inflight[key] }, 0) })
    }
    return inflight[key]
}

const renewAttemptAt = {}
const renewDue = (s, origin) => {
    if (!s.expiresAt) return false
    const exp = Date.parse(s.expiresAt)
    const got = Number(s.receivedAt) || 0
    if (!got || !exp) return exp - Date.now() < RENEW_AFTER_MAX_MS
    const after = Math.min(RENEW_AFTER_MAX_MS, (exp - got) / 2)
    if (Date.now() - got < after) return false
    return !(renewAttemptAt[origin] && Date.now() - renewAttemptAt[origin] < RENEW_RETRY_MS)
}

const refusedUntil = {}
// The long backoff exists because the hub rate-limits exchanges per IP, so it belongs to
// the case where the hub DECLINED us — any 4xx: a rate limit, or a credential it will keep
// rejecting. A hub that is restarting or unreachable (5xx, or no answer at all) has declined
// nothing; giving that the full minute left every page that loaded in the window empty long
// after the hub was healthy again (Asana 1218810480646362).
const hubDeclined = (status) => status >= 400 && status < 500
const exchange = async (key, origin, path, headers, role) => {
    if (refusedUntil[key] && Date.now() < refusedUntil[key]) return null
    return once(key, async () => {
        const { status, data } = await postSessionRaw(origin, path, headers)
        if (data) { delete refusedUntil[key]; setHubSession(origin, { token: data.token, expiresAt: data.expiresAt, role }); return data.token }
        refusedUntil[key] = Date.now() + (hubDeclined(status) ? REFUSAL_BACKOFF_MS : DOWN_BACKOFF_MS)
        return null
    })
}

/**
 * How long until another exchange for this hub is allowed, when that is soon enough to be
 * worth waiting for (the hub-is-down pause, not the refusal backoff). 0 = do not wait.
 */
const shortRetryWait = (origin) => {
    const until = Math.max(refusedUntil[`admin:${origin}`] || 0, refusedUntil[`public:${origin}`] || 0)
    const wait = until - Date.now()
    return wait > 0 && wait <= DOWN_BACKOFF_MS ? wait + 25 : 0
}

/**
 * A session worth retrying a failed read with: present, not the one that just failed, and
 * not a public session standing in for a staff login. That last case is why this is not a
 * plain token comparison — a public session that /renew refreshed is a DIFFERENT token
 * that the hub will refuse on the same admin route, and spending the one replay on it
 * wastes the retry the admin exchange was about to earn.
 */
const usableSession = (origin, token, unusable) => {
    if (!token || token === unusable) return false
    const stored = getHubSession(origin)
    return !(isAdminLogin() && stored && stored.role === 'public')
}

/**
 * A session for this hub, waiting out a hub-is-down pause once if that is what stands in
 * the way. Bounded by DOWN_BACKOFF_MS — a refused exchange is never waited for.
 */
const waitForSession = async (origin, unusable) => {
    const token = await ensureHubSession(origin)
    if (usableSession(origin, token, unusable)) return token
    const wait = shortRetryWait(origin)
    if (!wait) return token
    await new Promise((r) => setTimeout(r, wait))
    const next = await ensureHubSession(origin)
    return usableSession(origin, next, unusable) ? next : null
}

/** A valid session token for the hub a request goes to, or null. Never throws. */
export const ensureHubSession = async (hubUrl) => {
    const origin = originOf(hubUrl)
    if (!origin) return null
    const s = getHubSession(origin)
    const jToken = read('jToken')
    const wantAdmin = isAdminLogin() && !!jToken
    // A public session (e.g. picked up on a pre-login page, or while an admin exchange was
    // refused) never stands in for a logged-in admin: the admin exchange is tried first
    // (with the refusal backoff) and replaces it when it succeeds.
    if (s && !(s.role === 'public' && wantAdmin)) {
        if (renewDue(s, origin)) {
            renewAttemptAt[origin] = Date.now()
            once(`renew:${origin}`, async () => {
                const r = await postSessionRaw(origin, 'renew', { Authorization: `Bearer ${s.token}` })
                const cur = getHubSession(origin)
                if (!cur || cur.token !== s.token) return
                if (r.data) setHubSession(origin, { token: r.data.token, expiresAt: r.data.expiresAt, role: r.data.role || s.role })
                else if (r.status === 401) clearHubSession(origin) // hub says the session is no longer valid
            })
        }
        return s.token
    }
    if (wantAdmin) {
        const token = await exchange(`admin:${origin}`, origin, 'admin', { Authorization: `Bearer ${jToken}` }, 'admin')
        if (token) return token
    }
    if (s) return s.token
    if (config.publicSessions) return exchange(`public:${origin}`, origin, 'public', null, 'public')
    return null
}

const checkedAt = {}
/**
 * A request that carried `token` for `origin` got a 401. Ask the hub (/renew) whether the
 * session is still valid, at most once per CHECK_INTERVAL_MS per origin. Invalid (401) →
 * drop it, so the next request re-exchanges (admin/public) or the app sends a partner to
 * /login once. Valid → keep (refreshed). Hub unreachable / other status → keep.
 */
export const checkSessionAfter401 = (origin, token) => {
    if (!origin || !token) return Promise.resolve()
    if (checkedAt[origin] && Date.now() - checkedAt[origin] < CHECK_INTERVAL_MS) return Promise.resolve()
    checkedAt[origin] = Date.now()
    return once(`check:${origin}`, async () => {
        const s = getHubSession(origin)
        if (!s || s.token !== token) return
        const r = await postSessionRaw(origin, 'renew', { Authorization: `Bearer ${token}` })
        const cur = getHubSession(origin)
        if (!cur || cur.token !== token) return
        if (r.status === 401) clearHubSession(origin)
        else if (r.data) setHubSession(origin, { token: r.data.token, expiresAt: r.data.expiresAt, role: r.data.role || cur.role })
    })
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
    const target = axiosTarget(cfg)
    const token = await ensureHubSession(target)
    // Recorded even when no token was available: that is exactly the case the replay below
    // repairs (the request went out unauthenticated and the hub answered 400).
    cfg.__hubCall = { origin: originOf(target), token: token || null }
    if (token) cfg.__hubSessionUsed = { origin: originOf(target), token }
    const { headers } = rewriteCredentialHeaders(flat, token)
    for (const k of Object.keys(flat)) {
        if (!(k in headers)) { if (typeof h.delete === 'function') h.delete(k); else delete h[k] }
    }
    if (headers.Authorization) { if (typeof h.set === 'function') h.set('Authorization', headers.Authorization); else h.Authorization = headers.Authorization }
    return cfg
}

/**
 * One replay, for hub READS only. A GET that failed because this browser had no usable
 * session (none yet, or one the hub has since rejected) is re-sent once — and only once —
 * after a session is obtained. Without it a single blip while the hub restarts leaves a
 * list page empty until the user reloads, which reads as "there is nothing here"
 * (Asana 1218810480646362). Never for a write: a POST/PUT/DELETE may already have landed.
 */
const REPLAY_STATUSES = [400, 401]
const replayable = (cfg, status) => Boolean(cfg && cfg.__hubCall) && !cfg.__hubReplayed &&
    String(cfg.method || 'get').toLowerCase() === 'get' && REPLAY_STATUSES.includes(status)

const withFreshAuth = (headers, token) => {
    const source = headers && typeof headers.toJSON === 'function' ? headers.toJSON() : { ...(headers || {}) }
    const out = {}
    for (const k of Object.keys(source)) if (k.toLowerCase() !== 'authorization') out[k] = source[k]
    out.Authorization = `Bearer ${token}`
    return out
}

const axiosErrorInterceptor = async (err) => {
    const cfg = err && err.config
    const status = err && err.response && err.response.status
    const used = cfg && cfg.__hubSessionUsed
    if (used && status === 401) {
        // Awaited only when a replay may follow, so every other 401 rejects exactly as before.
        const checked = checkSessionAfter401(used.origin, used.token)
        if (replayable(cfg, status)) await checked
    }
    if (!replayable(cfg, status)) return Promise.reject(err)
    const token = await waitForSession(cfg.__hubCall.origin, cfg.__hubCall.token)
    if (!token || token === cfg.__hubCall.token) return Promise.reject(err)
    return axios.request({
        ...cfg,
        headers: withFreshAuth(cfg.headers, token),
        __hubReplayed: true,
        __hubCall: { ...cfg.__hubCall, token },
    })
}

let installed = false
export const installHubSessionTransport = () => {
    if (installed || typeof window === 'undefined') return
    installed = true
    axios.interceptors.request.use(axiosRequestInterceptor)
    axios.interceptors.response.use(undefined, axiosErrorInterceptor)
    const origCreate = axios.create.bind(axios)
    axios.create = (cfg) => {
        const inst = origCreate(cfg)
        inst.interceptors.request.use(axiosRequestInterceptor)
        inst.interceptors.response.use(undefined, axiosErrorInterceptor)
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
            const res = await origFetch(input, { ...init, headers: rewriteCredentialHeaders(flat, token).headers })
            // Same one-replay rule as the axios path, reads only; everything else returns
            // exactly as before, including the fire-and-forget session check on a 401.
            const mayReplay = res && REPLAY_STATUSES.includes(res.status) && String(init.method || 'GET').toUpperCase() === 'GET'
            if (token && res && res.status === 401) {
                const checked = checkSessionAfter401(originOf(url), token)
                if (mayReplay) await checked
            }
            if (!mayReplay) return res
            const fresh = await waitForSession(originOf(url), token)
            if (!fresh || fresh === token) return res
            return origFetch(input, { ...init, headers: rewriteCredentialHeaders(flat, fresh).headers })
        }
    }
}

installHubSessionTransport()
