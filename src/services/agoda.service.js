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

// ---- Listings feed --------------------------------------------------------
// Dedicated picker feed: GET /services/agoda/listings — returns per listing
// the current xdata.agoda, mirror count, eligibility verdict + blockers, and
// last push outcome. status: enabled|disabled|ready|blocked (omit for all).
export async function fetchAgodaListings ({ accountId = '', skip = 0, limit = 50, q = '', status = '' } = {}) {
  const params = new URLSearchParams()
  params.set('skip', skip); params.set('limit', limit)
  if (q) params.set('q', q)
  if (status) params.set('status', status)
  if (accountId) params.set('accountId', accountId)
  const res = await api.get(`${base}/services/agoda/listings?${params}`)
  return res.data
}

// ---- Image mirror ----------------------------------------------------------
// POST /services/agoda/mirror-images/:listingId — copies the listing's photos
// to our S3/CDN (images.villatracker.com); required before CPAPI pushes.
export async function mirrorImages (listingId, force = false) {
  const res = await api.post(`${base}/services/agoda/mirror-images/${listingId}${force ? '?force=1' : ''}`)
  return res.data
}

// ---- CPAPI onboarding chain ------------------------------------------------
// Creates the property/room/rateplan/product on Agoda's side; hotel/room/rate
// codes are stored on xdata.agoda by the backend as each step returns its id.
// NOTE: Agoda needs ~5 minutes after property creation before rooms/rateplans.
export async function cpapiCreateProperty (listingId) {
  const res = await api.post(`${base}/services/agoda/cpapi/property/${listingId}`)
  return res.data
}
export async function cpapiCreateRoom (listingId) {
  const res = await api.post(`${base}/services/agoda/cpapi/room/${listingId}`)
  return res.data
}
export async function cpapiCreateRatePlan (listingId) {
  const res = await api.post(`${base}/services/agoda/cpapi/rateplan/${listingId}`)
  return res.data
}
export async function cpapiCreateProduct (listingId) {
  const res = await api.post(`${base}/services/agoda/cpapi/product/${listingId}`)
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
  // staff-JWT auth probe (the /v1 twin needs a consumer X-API-Key we don't hold)
  const res = await api.get(`${base}/services/agoda/auth-test${accountId ? '?accountId=' + accountId : ''}`)
  return res.data
}

export async function updateInquiryStatus (id, status, notes = '') {
  const res = await api.patch(`${base}/services/agoda/inquiries/${id}/status`, { status, notes })
  return res.data
}

export default {
  fetchAgodaListings, saveAgodaConfig, setAgodaEnabled, bulkAgodaConfig,
  mirrorImages, cpapiCreateProperty, cpapiCreateRoom, cpapiCreateRatePlan, cpapiCreateProduct,
  pushListing, pushAllEnabled, fetchSyncLedger, fetchInquiries, updateInquiryStatus, registerAccount, testAuth,
}
