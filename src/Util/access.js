// ---------------------------------------------------------------------------
// What a logged-in PARTNER may open, and whose data — one definition.
// Keep byte-identical in EXTRANET-VT and EXTRANET-SH.
//
// 2026-09-14 (LIVE incident, Asana 1218458397688064): a partner logged in from
// the extranet email and /partners-ru showed ALL partners. The router had no
// admin guard at all — every admin page rendered for any session. Partners are
// now DENY-BY-DEFAULT: only the paths below, anything else redirects to their
// own home; the pages they may open check that the account belongs to them.
//
// A partner session is `partnerLogin` in localStorage (set by signInUnified),
// or a role key 'partner' with no role key 'admin'. `agent` / `agent_id` belong
// to a SHARED internal agent for partners, so `agent.role` says nothing about the
// person — never use it to decide admin vs partner.
//
// This is a UI boundary only. The hubs still accept the static token the bundle
// ships, so a determined caller can bypass it — that is Asana 1218458529003876.
//
// No imports on purpose: scripts/test-access.mjs runs it with plain node.
// ---------------------------------------------------------------------------

const ROLE_KEYS = ['extranet-vt-logged-in-role', 'extranet-sh-logged-in-role']
const OWN_IDS_KEY = 'partnerAccountIds'

const read = (key) => { try { return localStorage.getItem(key) } catch (e) { return null } }

/** The accountId the partner logged in with, or null. */
export const partnerLoginId = () => read('partnerLogin') || null

/** True for a partner session (never for an admin one). */
export const isPartnerSession = () => {
    if (partnerLoginId()) return true
    const roles = ROLE_KEYS.map(read)
    return roles.includes('partner') && !roles.includes('admin')
}

// Pages anyone may open (login, magic link, password reset, signup).
const PUBLIC_PATHS = ['/login', '/qr', '/verifycode', '/resetpassword', '/forgotPassword', '/signupthanks', '/welcome', '/signup']
// The partner journey (traced 2026-09-14): home pages, their listings, a listing
// page, the photo manager from the partner email, terms.
const PARTNER_PATHS = ['/partners', '/partners-ru', '/partners-bp', '/listings', '/listings-ru', '/listings-bp', '/property', '/photos', '/terms-and-conditions']

// Exact path, or a sub-path ('/photos/abc'); never a sibling prefix
// ('/partners' must not admit '/partners-ru-dh').
const matches = (pathname, base) => pathname === base || pathname.startsWith(`${base}/`)

/** May a partner session open this pathname? */
export const isPartnerAllowedPath = (pathname) => {
    const p = String(pathname || '').replace(/\/+$/, '') || '/'
    return [...PUBLIC_PATHS, ...PARTNER_PATHS].some((base) => matches(p, base))
}

/** Where a partner lands: the RU / BP channel pages only for sh-ru / sh-bp accounts. */
export const partnerHomePath = (accountId = partnerLoginId()) => {
    if (!accountId) return '/login'
    if (/sh-ru/i.test(accountId)) return '/partners-ru'
    if (/sh-bp/i.test(accountId)) return '/partners-bp'
    // RU-*, BP-*, G-* twins and 24-hex Guesty ids: /partners looks the account up
    // exactly (no provider pin), so every shape finds its own row there.
    return '/partners'
}

const HOME_PATHS = ['/partners', '/partners-ru', '/partners-bp']

/**
 * Where the router must send a partner session instead of `pathname`, or null to let
 * it through. Not a partner page → home; a home page that is not THEIR home (e.g. an
 * RU-* account on /partners-ru, which would show an empty table) → their home.
 */
export const partnerRedirectFor = (pathname, accountId = partnerLoginId(), search = currentSearch()) => {
    if (!isPartnerSession()) return null
    const p = String(pathname || '').replace(/\/+$/, '') || '/'
    const home = partnerHomePath(accountId)
    if (!isPartnerAllowedPath(p)) return home
    if (HOME_PATHS.includes(p) && p !== home) return home
    // Listing pages act for the account in ?accountId= or the drilled-down partner.
    if (LISTING_PATHS.includes(p)) {
        const acc = listingPageAccount(search)
        if (!acc || !partnerOwnsAccount(acc)) return home
    }
    return null
}

const LISTING_PATHS = ['/listings', '/listings-ru', '/listings-bp']
const currentSearch = () => { try { return window.location.search || '' } catch (e) { return '' } }

/** The account a listings page will load: ?accountId=, else the stored partner, else `accountId`. */
export const listingPageAccount = (search = currentSearch()) => {
    try {
        const urlAcc = new URLSearchParams(search || '').get('accountId')
        if (urlAcc) return urlAcc
        const stored = JSON.parse(read('partner') || 'null')
        return (stored && stored.accountId) || read('accountId') || null
    } catch (e) { return null }
}

/** Remember the accounts this partner owns (their login account + same-email twins). */
export const rememberPartnerAccounts = (accountIds) => {
    try {
        const own = new Set([partnerLoginId(), ...(accountIds || [])].filter(Boolean).map(String))
        localStorage.setItem(OWN_IDS_KEY, JSON.stringify([...own]))
    } catch (e) { /* storage unavailable: ownership falls back to partnerLogin only */ }
}

/** Does the current session own this accountId? Admin sessions own everything. */
export const partnerOwnsAccount = (accountId) => {
    if (!isPartnerSession()) return true
    if (!accountId) return false
    const login = partnerLoginId()
    if (login && String(accountId) === login) return true
    try {
        const own = JSON.parse(read(OWN_IDS_KEY) || '[]')
        return Array.isArray(own) && own.map(String).includes(String(accountId))
    } catch (e) { return false }
}
