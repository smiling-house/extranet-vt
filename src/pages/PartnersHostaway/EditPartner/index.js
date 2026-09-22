// -------------------------------------------------
// PartnersHostaway / EditPartner — onboarding form for a new Hostaway
// account. Submits to POST /hostaway-connect, which validates credentials
// against Hostaway's /accessTokens + a /listings probe before encrypting
// the secret and persisting HostawayAccount.
// -------------------------------------------------
import React, { useState } from "react"
import AuthService from "../../../services/auth.service"
import { buildHostawayConnectPayload, existingLoginConflict, hwAccountId } from "../../../Util/hostawayConnect"
import swal from "sweetalert"
import "./EditPartner.scss"

const EditPartner = ({ onClose }) => {
  const [accountId, setAccountId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [pmName, setPmName] = useState("")
  const [email, setEmail] = useState("")
  const [vtAccountId, setVtAccountId] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    // The hub creates the partner's Extranet login and sends the onboarding email only
    // when the connect carries their email (src/Util/hostawayConnect.js).
    const built = buildHostawayConnectPayload({ accountId, clientSecret, vtAccountId, email, pmName })
    if (!built.ok) {
      const titles = { accountId: "Invalid Account ID", clientSecret: "Missing Client Secret", email: "Partner email required" }
      swal({ icon: "error", title: titles[built.field] || "Check the form", text: built.error })
      return
    }
    const payload = built.payload

    setSubmitting(true)
    // Reconnecting with a DIFFERENT email would give the account a second login, and the
    // onboarding email could then never be sent. Refuse that before calling the hub.
    try {
      const rows = await AuthService.findPartnerLoginRows(hwAccountId(payload.accountId))
      const check = existingLoginConflict(rows, payload.email)
      if (check.conflict) {
        swal({
          icon: "error",
          title: "This account already has a login",
          text: check.rowWithoutEmail
            ? `${hwAccountId(payload.accountId)} already has a login with no email on file. Ask tech to fix that login before reconnecting.`
            : `${hwAccountId(payload.accountId)} already signs in as ${check.existingEmails.join(", ")}. Reconnect with that email, or ask tech to change the partner's email first.`,
        })
        setSubmitting(false)
        return
      }
    } catch (e) {
      const go = await swal({
        icon: "warning",
        title: "Could not check for an existing login",
        text: "Connect anyway? If this account already has a login with a different email, a second one would be created.",
        buttons: ["Cancel", "Connect anyway"],
        dangerMode: true,
      })
      if (!go) { setSubmitting(false); return }
    }

    try {
      const res = await AuthService.connectHostawayPartner(payload)
      if (res?.data?.success) {
        swal({
          icon: "success",
          title: "Connected!",
          text: `Hostaway account ${res.data.accountId} connected. ${payload.email} is the partner's Extranet login (${hwAccountId(res.data.accountId)}) and receives the onboarding email unless the account is on hold (sent once; reconnecting does not resend it). Click "Sync now" on its row to pull listings.`,
        })
        setTimeout(() => onClose(true), 1200)
      } else {
        swal({ icon: "error", title: "Connect failed", text: res?.data?.error || "Unknown response from server" })
      }
    } catch (e) {
      swal({
        icon: "error",
        title: "Hostaway rejected the credentials",
        text: e?.response?.data?.error || e?.message || String(e),
      })
    }
    setSubmitting(false)
  }

  return (
    <div className="hostaway-edit-partner" style={{ padding: "24px" }}>
      <div style={{ marginBottom: 16, color: "#555" }}>
        <p>
          Enter the partner's Hostaway credentials. We'll validate them against
          the Hostaway API and store the secret encrypted (AES-256-GCM).
        </p>
        <p style={{ fontSize: 13, color: "#888" }}>
          Account ID = Hostaway's <code>client_id</code> (numeric).
          Client Secret = the <code>client_secret</code> shown once at API-key creation in the Hostaway dashboard.
        </p>
      </div>

      <div className="row" style={{ marginBottom: 12 }}>
        <div className="col-md-6">
          <label style={{ fontWeight: 500 }}>Account ID (Hostaway client_id) *</label>
          <input
            type="number"
            className="form-control"
            value={accountId}
            placeholder="e.g. 199068"
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label style={{ fontWeight: 500 }}>Partner Display Name</label>
          <input
            type="text"
            className="form-control"
            value={pmName}
            placeholder="e.g. Mountain Co Rentals"
            onChange={(e) => setPmName(e.target.value)}
          />
        </div>
      </div>

      <div className="row" style={{ marginBottom: 12 }}>
        <div className="col-md-12">
          <label style={{ fontWeight: 500 }}>Partner Email *</label>
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder="e.g. owner@partner.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small style={{ color: "#888" }}>Becomes the partner's Extranet login and receives the onboarding email.</small>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 12 }}>
        <div className="col-md-12">
          <label style={{ fontWeight: 500 }}>Client Secret (Hostaway API key) *</label>
          <input
            type="password"
            className="form-control"
            value={clientSecret}
            placeholder="paste the long hex / token from Hostaway"
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </div>
      </div>

      <div className="row" style={{ marginBottom: 12 }}>
        <div className="col-md-12">
          <label style={{ fontWeight: 500 }}>VT Partner ID (optional)</label>
          <input
            type="text"
            className="form-control"
            value={vtAccountId}
            placeholder="link to an existing VT partner record (optional)"
            onChange={(e) => setVtAccountId(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onClose(false)}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Connecting…" : "Connect"}
        </button>
      </div>
    </div>
  )
}

export default EditPartner
