// ---------------------------------------------------------------------------
// Pages that open ONE listing (/property?id=, /photos/:id) for a partner session:
// render only after the listing's accountId is confirmed to be the partner's own.
// Keep byte-identical in EXTRANET-VT and EXTRANET-SH. See src/Util/access.js.
//
// Admin sessions pass straight through (no request). A partner session renders
// nothing until the hub confirms ownership, and is sent home when it is not theirs
// or cannot be confirmed — fail closed.
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

export default function usePartnerListingGuard (listingId) {
    const history = useHistory()
    const partner = isPartnerSession()
    const [allowed, setAllowed] = useState(!partner)

    useEffect(() => {
        if (!partner) return undefined
        let cancelled = false
        const goHome = () => { if (!cancelled) history.replace(partnerHomePath()) }
        if (!listingId) { goHome(); return () => { cancelled = true } }
        const req = axios.create({ baseURL: constants.SHUB_URL, headers: { Authorization: `Bearer ${ShubAuth}` } })
        req.get(`/local/listings?id=${encodeURIComponent(listingId)}`)
            .then((res) => {
                const acc = accountOf(res && res.data)
                if (cancelled) return
                if (acc && partnerOwnsAccount(acc)) setAllowed(true)
                else goHome()
            })
            .catch(goHome)
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listingId, partner])

    return allowed
}
