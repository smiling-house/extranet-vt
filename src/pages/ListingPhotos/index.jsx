import React from "react"
import { useParams } from "react-router-dom"
import Layout from "../../components/Layout"
import PhotoManager from "../../components/PhotoManager"
import { getStorageValue } from "../../Util/general"
import usePartnerListingGuard from "../../Util/usePartnerListingGuard"

// Deep-linkable photo manager: /photos/:id  (dashboard + emails point here).
const ListingPhotos = ({ agent, agency, token, screenSize, activeMenu, handleToggleMenu, setActiveMenu }) => {
    const { id } = useParams()
    const role = localStorage.getItem('extranet-vt-logged-in-role')
    const partnerLogin = getStorageValue('partnerLogin')
    const agentData = (() => { try { return JSON.parse(localStorage.getItem('agent')) || {} } catch (e) { return {} } })()
    // LIVE 2026-09-14: a partner session opens only its own listing's photos.
    const listingAllowed = usePartnerListingGuard(id)
    if (!listingAllowed) return null
    return (
        <Layout
            pageTitle="Photos"
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        >
            <div style={{ padding: '20px 30px', background: '#f6f8f9', minHeight: '100vh' }}>
                <PhotoManager
                    listingId={id}
                    inline
                    isAdmin={role === 'admin' && !partnerLogin}
                    actor={agentData?.email || agentData?.firstName || 'extranet'}
                />
            </div>
        </Layout>
    )
}

export default ListingPhotos
