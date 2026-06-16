// -------------------------------------------------
// PartnersHostaway — Hostaway PMS connect + sync + booking-demo page.
// Mirrors the PartnersSH/PartnersVT layout but trimmed for the Hostaway
// integration's Partner Certification demo: connect a Hostaway account,
// trigger a sync on demand, view synced listings (via the shared Listings2
// page), and run the create+cancel reservation demo.
// -------------------------------------------------
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import swal from "sweetalert"
import Layout from "../../components/Layout"
import LoadingBox from "../../components/LoadingBox"
import AuthService from "../../services/auth.service"
import EditPartner from "./EditPartner"
import BookingDemo from "./BookingDemo"
import { PATH_LISTINGS } from "../../Util/constants"
import addAdminIcon from "../../assets/icons/admin/menu/add.svg"
import "./Admin.scss"

const PartnersHostaway = (props) => {
  const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
  const history = useHistory()

  const [partners, setPartners] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showConnect, setShowConnect] = useState(false)
  const [showBookingDemo, setShowBookingDemo] = useState(null) // partner row or null
  const [syncingId, setSyncingId] = useState(null)

  const loadPartners = async () => {
    setIsLoading(true)
    try {
      const res = await AuthService.listHostawayPartners()
      setPartners(res?.data?.accounts || [])
    } catch (e) {
      swal({
        icon: "error",
        title: "Failed to load Hostaway partners",
        text: e?.response?.data?.error || e?.message || String(e),
      })
    }
    setIsLoading(false)
  }

  useEffect(() => { loadPartners() }, [])

  const onSyncNow = async (accountId) => {
    setSyncingId(accountId)
    try {
      const res = await AuthService.triggerHostawaySync(accountId)
      const steps = res?.data?.accounts?.[0]?.steps || []
      const failed = steps.filter((s) => !s.ok).length
      if (res?.data?.ok && failed === 0) {
        swal({
          icon: "success",
          title: "Sync complete",
          text: `${steps.length} steps OK`,
        })
      } else {
        const firstFail = steps.find((s) => !s.ok)
        swal({
          icon: "warning",
          title: "Sync had issues",
          text: `${failed} step(s) failed. First: ${firstFail?.name || "?"}`,
        })
      }
      loadPartners()
    } catch (e) {
      swal({
        icon: "error",
        title: "Sync failed",
        text: e?.response?.data?.error || e?.message || String(e),
      })
    }
    setSyncingId(null)
  }

  const onViewListings = (partner) => {
    const canonicalAccountId = `HW-${partner.accountId}`
    // `source` in the partner object is what Listings2 uses as
    // `channelSource` in its /local/listings query. step_hwUpsertIntoListings
    // hardcodes `channelSource: 'Hostaway'` on the canonical row, so we must
    // pass that exact string (NOT 'HW').
    const partnerForListings = {
      ...partner,
      accountId: canonicalAccountId,
      source: "Hostaway",
      pmName: partner.pmName || "Hostaway",
    }
    localStorage.setItem("partner", JSON.stringify(partnerForListings))
    history.push(PATH_LISTINGS, {
      partner: partnerForListings,
      accountId: canonicalAccountId,
      source: "Hostaway",
    })
  }

  const onConnectClosed = (didConnect) => {
    setShowConnect(false)
    if (didConnect) loadPartners()
  }

  return (
    <Layout
      pageTitle="Hostaway PMs"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="agencies-container">
        <LoadingBox visible={isLoading} />

        {showConnect && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1050,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginTop: "50px",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" style={{ fontSize: "22px", padding: "10px 0px 10px 15px" }}>
                    Connect Hostaway Partner
                  </h4>
                  <button
                    type="button"
                    className="close"
                    onClick={() => onConnectClosed(false)}
                    style={{
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      color: "#212121",
                      background: "none",
                      marginLeft: "auto",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ padding: 0, maxHeight: "85vh", overflowY: "auto" }}>
                  <EditPartner onClose={onConnectClosed} />
                </div>
              </div>
            </div>
          </div>
        )}

        {showBookingDemo && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1050,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginTop: "50px",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" style={{ fontSize: "22px", padding: "10px 0px 10px 15px" }}>
                    Booking Demo — Account {showBookingDemo.accountId}
                  </h4>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowBookingDemo(null)}
                    style={{
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      color: "#212121",
                      background: "none",
                      marginLeft: "auto",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ padding: 0, maxHeight: "85vh", overflowY: "auto" }}>
                  <BookingDemo partner={showBookingDemo} onClose={() => setShowBookingDemo(null)} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="agencies-main">
          <div className="agencies-title">
            <span>Hostaway PM List</span>
            <a
              className="dropdown-item"
              style={{ whiteSpace: "unset" }}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setShowConnect(true)
              }}
            >
              <img src={addAdminIcon} alt="" /> Connect Hostaway PM partner
            </a>
            <div className="agencies-main-subtitle">
              {partners.length} partner{partners.length === 1 ? "" : "s"} onboarded
            </div>
          </div>

          <div className="table-responsive px-3">
            <table className="table">
              <thead style={{ backgroundColor: "#f9f9f7" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">VT Partner</th>
                  <th scope="col">Timezone</th>
                  <th scope="col">Webhook</th>
                  <th scope="col">Last Sync</th>
                  <th scope="col">Status</th>
                  <th scope="col">Onboarded</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p, idx) => (
                  <tr key={p.accountId}>
                    <td className="px-4 p-3"><h4>{idx + 1}</h4></td>
                    <td
                      className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"
                      onClick={() => onViewListings(p)}
                    >
                      <h4>{p.accountId}</h4>
                    </td>
                    <td className="px-4 p-3"><h4>{p.vtAccountId || "—"}</h4></td>
                    <td className="px-4 p-3"><h4>{p.timezone || "—"}</h4></td>
                    <td className="px-4 p-3"><h4>{p.webhookId ? "✓" : "—"}</h4></td>
                    <td className="px-4 p-3"><h4>{p.lastSyncAt ? new Date(p.lastSyncAt).toLocaleString() : "never"}</h4></td>
                    <td className="px-4 p-3"><h4>{p.lastSyncStatus || "—"}</h4></td>
                    <td className="px-4 p-3"><h4>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}</h4></td>
                    <td className="px-4 p-3" style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ marginRight: 6 }}
                        disabled={syncingId === p.accountId}
                        onClick={() => onSyncNow(p.accountId)}
                      >
                        {syncingId === p.accountId ? "Syncing…" : "Sync now"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setShowBookingDemo(p)}
                      >
                        Booking demo
                      </button>
                    </td>
                  </tr>
                ))}
                {partners.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="9" className="px-4 p-3 text-center">
                      <h4>No Hostaway partners onboarded yet. Click <em>Connect Hostaway PM partner</em> above to add one.</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PartnersHostaway
