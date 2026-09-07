// ---------------------------------------------------------------------------
// The partner doc the extranet is currently acting for.
//
// Lifted out of pages/Listings2/views/ListingViews.jsx, where it was a private
// helper. It has to be shared: the listings LIST resolved instant-book state
// with the partner default and the PROPERTY page did not, so the same listing
// read "ON" in one place and "inherits account (OFF)" in the other. One
// definition is the fix.
//
// Read per call, never cached in a module variable: switching partner reloads or
// re-navigates, and a stale capture would show the previous partner's default.
// ---------------------------------------------------------------------------

/** The partner/account doc stored at drill-down, or null. */
export const storedPartner = () => {
    try { return JSON.parse(localStorage.getItem('partner')) || null } catch (e) { return null }
}

/** The accountId the account-level controls write against, or null. */
export const storedAccountId = () => {
    try {
        return storedPartner()?.accountId || localStorage.getItem('partnerLogin') || null
    } catch (e) { return null }
}

/** Who to record as the author of a change, for the hub's audit fields. */
export const currentActor = () => {
    try {
        const role = localStorage.getItem('extranet-sh-logged-in-role')
            || localStorage.getItem('extranet-vt-logged-in-role')
        const who = storedPartner()?.email || localStorage.getItem('partnerLogin') || 'unknown'
        return `extranet:${role || 'partner'}:${who}`.slice(0, 200)
    } catch (e) { return 'extranet' }
}
