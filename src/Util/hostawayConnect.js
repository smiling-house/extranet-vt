// ---------------------------------------------------------------------------
// Hostaway "Connect partner" form helpers. Asana 1218719984465196.
// Identical in EXTRANET-VT and EXTRANET-SH. Pure: no imports, so it is unit-tested
// offline (scripts/test-hostaway-connect.mjs).
//
// The hub's POST /hostaway-connect creates the partner's Extranet login (a users row
// HW-<id> with their email) and sends the onboarding email ONLY when `email` is in
// the body (VTHub/SHub api/utils/hostawayPartnerUser.js). This form used to send no
// email, so partners connected from the Extranet synced but could never log in.
// ---------------------------------------------------------------------------

// Same rule the hub applies (hostawayPartnerUser.normalizePartnerEmail): one address,
// trimmed, lowercased. The login compares the stored email exactly, and the access
// link carries the stored address, so lowercase here is what the partner signs in with.
export const normalizePartnerEmail = (raw) => {
  if (typeof raw !== 'string') return null
  const email = raw.trim().toLowerCase()
  if (!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email)) return null
  return email
}

export const hwAccountId = (accountId) => {
  const s = String(accountId ?? '').trim()
  if (!s) return ''
  return s.startsWith('HW-') ? s : `HW-${s}`
}

/**
 * Validate the form and build the /hostaway-connect body.
 * @returns {{ ok: true, payload: object } | { ok: false, field: string, error: string }}
 */
export const buildHostawayConnectPayload = ({ accountId, clientSecret, vtAccountId, email, pmName } = {}) => {
  const accountIdNum = Number(accountId)
  if (!Number.isInteger(accountIdNum) || accountIdNum <= 0) {
    return { ok: false, field: 'accountId', error: 'Account ID must be a positive integer (Hostaway client_id).' }
  }
  if (typeof clientSecret !== 'string' || clientSecret.trim().length === 0) {
    return { ok: false, field: 'clientSecret', error: 'Paste the Hostaway client_secret (API key) value.' }
  }
  const partnerEmail = normalizePartnerEmail(email)
  if (!partnerEmail) {
    return { ok: false, field: 'email', error: 'Enter the partner\'s email address. It becomes their Extranet login and receives the onboarding email.' }
  }
  return {
    ok: true,
    payload: {
      accountId: accountIdNum,
      clientSecret: clientSecret.trim(),
      vtAccountId: typeof vtAccountId === 'string' ? vtAccountId.trim() : '',
      email: partnerEmail,
      pmName: typeof pmName === 'string' ? pmName.trim() : '',
    },
  }
}

/**
 * The hub creates a SECOND login row when an account is reconnected with a different
 * email, and the onboarding email can then never be sent (hostawayPartnerUser.js
 * header). Given the account's existing partner rows, say whether this email conflicts.
 * @returns {{ conflict: boolean, existingEmails: string[] }}
 */
export const existingLoginConflict = (rows, email) => {
  const wanted = normalizePartnerEmail(email)
  const list = (Array.isArray(rows) ? rows : []).filter(Boolean)
  const existingEmails = [...new Set(list.map((r) => normalizePartnerEmail(r.email)).filter(Boolean))]
  // The hub matches an existing login on email only, so a row with NO email would still get a
  // second row next to it. Treat it as a conflict as well.
  const rowWithoutEmail = list.some((r) => !normalizePartnerEmail(r.email))
  if (!wanted || list.length === 0) return { conflict: false, existingEmails, rowWithoutEmail: false }
  return { conflict: rowWithoutEmail || !existingEmails.includes(wanted), existingEmails, rowWithoutEmail }
}

export default { normalizePartnerEmail, hwAccountId, buildHostawayConnectPayload, existingLoginConflict }
