// -------------------------------------------------
// Agoda (YCS) distribution API calls -> VTHub (constants.SHUB_URL).
//
// Endpoints marked (existing) are live in VTHub today. Endpoints marked
// (PENDING BACKEND) are specified in extranet-vt/AGODA-UI-PLAN.md §2 and must
// be added to VTHub before the picker can persist. They are wired here so the
// UI is complete the moment the backend lands.
// -------------------------------------------------
import axios from 'axios'
import constants from '../Util/constants.js'
import { ShubAuth } from '../core/index.js'

const api = axios.create({ headers: { Authorization: `Bearer ${ShubAuth}` } })
const base = constants.SHUB_URL

// ---- Listings feed (existing) --------------------------------------------
// Reuses the general listings endpoint. Guesty-only, paged.
export async function fetchAgodaListings ({ accountId = '', skip = 0, limit = 100, q = '', sortBy = 'data.nickname:1' } = {}) {
  let filters = '[]'
  const params = { filters, limit, skip, sortBy, source: 'guesty_channel_api' }
  let qs = Object.keys(params).map(k => `${k}=${params[k]}`).join('&')
  if (accountId) qs += `&accountId=${accountId}`
  if (q) qs += `&q=${encodeURIComponent(q.toLowerCase())}`
  const res = await api.get(`${base}/local/listings?${qs}`)
  return res.data
}

// ---- Per-listing config (PENDING BACKEND) --------------------------------
// POST /services/agoda/listing/:listingId/config
//   body: { hotelCode, roomTypeCode, ratePlanCode, currency, enabled }
export async function saveAgodaConfig (listingId, config) {
  const res = await api.post(`${base}/services/agoda/listing/${listingId}/config`, config)
  return res.data
}

// POST /services/agoda/listing/:listingId/enable  body: { enabled }
export async function setAgodaEnabled (listingId, enabled) {
  const res = await api.post(`${base}/services/agoda/listing/${listingId}/enable`, { enabled })
  return res.data
}

// POST /services/agoda/listings/bulk-config  body: { items:[{listingId, ...}] }
export async function bulkAgodaConfig (items) {
  const res = await api.post(`${base}/services/agoda/listings/bulk-config`, { items })
  return res.data
}

// ---- Push ARI (existing) --------------------------------------------------
export async function pushListing (accountId, listingId, body = {}) {
  const res = await api.post(`${base}/services/agoda/sync/${accountId}/${listingId}`, body)
  return res.data
}

export async function pushAllEnabled (accountId, body = {}) {
  const res = await api.post(`${base}/services/agoda/sync/${accountId}`, body)
  return res.data
}

// ---- Ledger / inquiries / account (existing) ------------------------------
export async function fetchSyncLedger (query = {}) {
  const qs = Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
  const res = await api.get(`${base}/services/agoda/sync-ledger${qs ? '?' + qs : ''}`)
  return res.data
}

export async function fetchInquiries (query = {}) {
  const qs = Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
  const res = await api.get(`${base}/services/agoda/inquiries${qs ? '?' + qs : ''}`)
  return res.data
}

export async function registerAccount (payload) {
  const res = await api.post(`${base}/services/agoda/account`, payload)
  return res.data
}

export async function testAuth (accountId = '') {
  // v1 self-verify endpoint (no billable upstream call beyond token exchange)
  const res = await api.get(`${base}/v1/agoda/auth/test${accountId ? '?accountId=' + accountId : ''}`)
  return res.data
}

export default {
  fetchAgodaListings, saveAgodaConfig, setAgodaEnabled, bulkAgodaConfig,
  pushListing, pushAllEnabled, fetchSyncLedger, fetchInquiries, registerAccount, testAuth,
}
