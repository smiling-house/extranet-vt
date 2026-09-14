// ---------------------------------------------------------------------------
// Pages that open ONE listing (/property?id=, /photos/:id) for a partner session:
// render only after the listing's accountId is confirmed to be the partner's own.
// Keep byte-identical in EXTRANET-VT and EXTRANET-SH. See src/Util/access.js.
//
// Admin sessions pass straight through (no request). A partner session renders
// nothing until the hub answers, and is sent home only when the hub says the listing
// belongs to another account. A failed request or a doc without an account lets the
// page load as it always did — a hiccup must never lock a partner out of their listing.
// ---------------------------------------------------------------------------
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import constants from './constants'
import { ShubAuth } from '../core'
import { isPartnerSession, partnerOwnsAccount, partnerHomePath } from './access'

const accountOf = (d) => {
    if (!d) return null
    if (d.accountId) return d.accountId
    const first = Array.isArray(d.listings) ? d.listings[0] : null
    return (first && (first.accountId || (first.listing && first.listing.accountId))) || null
}

export default function usePartnerListingGuard (listingId, fallbackAccountId) {
    const history = useHistory()
    const partner = isPartnerSession()
    const [allowed, setAllowed] = useState(!partner)

    useEffect(() => {
        if (!partner) return undefined
        let cancelled = false
        const goHome = () => { if (!cancelled) history.replace(partnerHomePath()) }
        if (!listingId) {
            // Some hub listings carry no data._id, so the page is reached with no id at all.
            // Allow it only when the account the listings page acted for is the partner's own.
            if (fallbackAccountId && partnerOwnsAccount(fallbackAccountId)) setAllowed(true)
            else goHome()
            return () => { cancelled = true }
        }
        const req = axios.create({ baseURL: constants.SHUB_URL, headers: { Authorization: `Bearer ${ShubAuth}` } })
        req.get(`/local/listings?id=${encodeURIComponent(listingId)}`)
            .then((res) => {
                const acc = accountOf(res && res.data)
                if (cancelled) return
                if (!acc || partnerOwnsAccount(acc)) setAllowed(true)
                else goHome()
            })
            .catch(() => { if (!cancelled) setAllowed(true) })
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listingId, fallbackAccountId, partner])

    return allowed
}
