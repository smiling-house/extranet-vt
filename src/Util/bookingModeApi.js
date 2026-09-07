// ---------------------------------------------------------------------------
// Writing the booking mode to the hub.
//
// Same client shape as components/PhotoManager/index.jsx:27-30 — the extranet's
// existing, already-authorised way of writing to the hub. `ShubAuth` is in the
// hub's KNOWN_TOKENS pool, which api/routes/instantBook.js now accepts alongside
// the dashboard's own credential.
//
// THE HUB IS THE SOURCE OF TRUTH. Nothing here caches or mirrors: every write
// goes to the hub and every read comes back from it, so the extranet cannot
// drift from what the site and the dashboard see.
//
// `mode: null` means INHERIT and clears the override. The hub `$unset`s rather
// than storing null, because a stored null reads as a value and would silently
// pin the listing, defeating the account default above it.
// ---------------------------------------------------------------------------
import axios from 'axios'
// Default export, not named — SHUB_URL lives on the default object in
// Util/constants.js. Same import shape as components/PhotoManager/index.jsx:7.
import constants from './constants'
import { ShubAuth } from '../core'
import { isMode } from './bookingMode'

const hub = () => axios.create({
    baseURL: constants.SHUB_URL,
    headers: { Authorization: `Bearer ${ShubAuth}` },
})

/** Both scopes go through one function so the request shape cannot drift. */
async function patch({ scope, key, mode, actor }) {
    if (!(mode === null || isMode(mode))) {
        // Membership, not typeof. Catch it here rather than letting a typo reach
        // the hub and become a stored override nothing in the UI can clear.
        throw new Error(`invalid booking mode: ${JSON.stringify(mode)}`)
    }
    const { data } = await hub().patch('/api/instant-book', {
        scope,
        key,
        mode,
        // Deliberately NOT sending `enabled`. The hub derives the legacy boolean
        // from the mode, and sending both would let the two disagree — the hub
        // rejects a contradiction, which would surface as a confusing 400.
        actor: actor || 'extranet',
    })
    if (!data?.ok) throw new Error(data?.error || 'the hub refused the change')
    return data
}

/** Set the account default for every listing that has no override of its own. */
export const setAccountBookingMode = ({ accountId, mode, actor }) =>
    patch({ scope: 'partner', key: accountId, mode, actor })

/** Set (or clear, with mode = null) one listing's override. */
export const setListingBookingMode = ({ hubId, mode, actor }) =>
    patch({ scope: 'listing', key: hubId, mode, actor })

/** Read back what the hub thinks, for one listing or one account. */
export async function getBookingMode({ accountId, listingId }) {
    const q = listingId ? `listingId=${encodeURIComponent(listingId)}` : `accountId=${encodeURIComponent(accountId)}`
    const { data } = await hub().get(`/api/instant-book?${q}`)
    if (!data?.ok) throw new Error(data?.error || 'the hub could not be read')
    return data
}
