// -------------------------------------------------
// PartnersHostaway / EditPartner — onboarding form for a new Hostaway
// account. Submits to POST /hostaway-connect, which validates credentials
// against Hostaway's /accessTokens + a /listings probe before encrypting
// the secret and persisting HostawayAccount.
// -------------------------------------------------
import React, { useState } from "react"
import AuthService from "../../../services/auth.service"
import swal from "sweetalert"
import "./EditPartner.scss"

const EditPartner = ({ onClose }) => {
  const [accountId, setAccountId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [pmName, setPmName] = useState("")
  const [vtAccountId, setVtAccountId] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    const accountIdNum = Number(accountId)
    if (!Number.isInteger(accountIdNum) || accountIdNum <= 0) {
      swal({ icon: "error", title: "Invalid Account ID", text: "Account ID must be a positive integer (Hostaway client_id)." })
      return
    }
    if (typeof clientSecret !== "string" || clientSecret.trim().length === 0) {
      swal({ icon: "error", title: "Missing Client Secret", text: "Paste the Hostaway client_secret (API key) value." })
      return
    }

    setSubmitting(true)
    try {
      const res = await AuthService.connectHostawayPartner({
        accountId: accountIdNum,
        clientSecret: clientSecret.trim(),
        vtAccountId: vtAccountId.trim() || "",
      })
      if (res?.data?.success) {
        swal({
          icon: "success",
          title: "Connected!",
          text: `Hostaway account ${res.data.accountId} onboarded. Click "Sync now" on its row to pull listings.`,
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
