// Human-readable status explanation shown to PARTNERS on listing rows.
// Admins keep seeing the raw internal reason (e.g. "TOO CHEAP") next to it.
// Keep this file identical in extranet-sh and extranet-vt.
//
// Keys are UPPERCASED parts of xdata.declineReason. Multi-reason values are
// comma-joined by the hubs ("TOO CHEAP, pmName APEEARS IN TITLE"). The
// misspelled keys below are the values actually stored in Mongo — keep them.
const REASON_MAP = {
	// Their price is their price — state the floor, no "change your rate" ask.
	'TOO CHEAP':
		'Below our USD 400/night minimum nightly rate.',
	'PMNAME APEEARS IN TITLE':
		'Your company name appears in the listing title — titles must describe the property only. Rename it and it will be re-reviewed.',
	'PMNAME APPEARS IN TITLE':
		'Your company name appears in the listing title — titles must describe the property only. Rename it and it will be re-reviewed.',
	'WITH WATERMARK/PICTURE INFORMATION':
		'Photos contain watermarks or overlaid text — replace them with clean photos and the listing will be re-reviewed.',
	'NOT FEET QUALITY':
		'The property does not currently meet the quality criteria for our luxury collection.',
	'NOT FIT QUALITY':
		'The property does not currently meet the quality criteria for our luxury collection.',
	'EXISTING AS SH PARTNER':
		'This property is already represented through an existing Smiling House partnership — declined to avoid a duplicate.',
	'UNMAPPED REGION':
		"Located in a region we don't currently distribute — no action needed on your side.",
	'NO ZIPCODE':
		'The listing has no zipcode in your PMS — add the full address and it will be re-reviewed.',
};

function friendlyParts(raw) {
	const parts = String(raw)
		.split(',')
		.map((p) => p.trim())
		.filter(Boolean);
	const out = [];
	for (const p of parts) {
		const mapped = REASON_MAP[p.toUpperCase()] || `Reason: ${p}`;
		if (!out.includes(mapped)) out.push(mapped);
	}
	return out;
}

// One entry per distinct reason. Callers that have room (the listing-card status
// note) render these as a list; the joined string form is below for tight spots.
export function partnerStatusReasonList(status, xdata) {
	const s = (status || '').toLowerCase();
	if (s === 'approved') return [];
	const raw = (xdata?.declineReason || '').trim();
	if (s === 'declined') {
		if (!raw) return ['Declined by our onboarding team — contact us if you believe this is a mistake.'];
		return friendlyParts(raw);
	}
	if (s === 'pending') {
		return ['Awaiting review by our onboarding team. Note: listings priced below USD 400/night cannot go live.'];
	}
	return [];
}

export function partnerStatusReason(status, xdata) {
	return partnerStatusReasonList(status, xdata).join(' • ');
}

// ── Seasonal listings ──────────────────────────────────────────────────────
// Listings whose nightly rates clear the USD 400 floor only part of the year
// are shown during their high season and hidden off-season (instead of being
// declined). The hubs send xdata.seasonal = { months:[1..12], floorUsd, … }
// and xdata.seasonalLiveNow (false = currently hidden from public search).
// All partner-facing strings live here so both extranets stay identical and
// a future i18n pass only has to touch this block.
const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

// Valid = 1..9 distinct months (10+ months is effectively year-round; the
// hubs shouldn't send that, but don't label it seasonal if they do).
function seasonalMonths(xdata) {
	const raw = xdata?.seasonal?.months;
	if (!Array.isArray(raw)) return null;
	const uniq = [];
	for (const m of raw) {
		if (Number.isInteger(m) && m >= 1 && m <= 12 && uniq.indexOf(m) === -1) uniq.push(m);
	}
	if (uniq.length < 1 || uniq.length > 9) return null;
	return uniq;
}

// [12, 1, 2, 3] → "December–March"; [6, 7, 8, 12] → "June–August, December".
// Runs are detected cyclically so wrap-around ranges read naturally.
export function seasonalMonthRangeLabel(months) {
	const has = (m) => months.indexOf(m) > -1;
	const ranges = [];
	for (let m = 1; m <= 12; m++) {
		const prev = m === 1 ? 12 : m - 1;
		if (!has(m) || has(prev)) continue; // not the start of a run
		let end = m;
		let next = end === 12 ? 1 : end + 1;
		while (has(next) && next !== m) {
			end = next;
			next = end === 12 ? 1 : end + 1;
		}
		ranges.push(m === end ? MONTH_NAMES[m - 1] : `${MONTH_NAMES[m - 1]}–${MONTH_NAMES[end - 1]}`);
	}
	return ranges.join(', ');
}

// '' when the listing is not seasonal; otherwise one partner-readable line.
export function seasonalStatusLabel(xdata) {
	const months = seasonalMonths(xdata);
	if (!months) return '';
	if (xdata?.seasonalLiveNow === false) {
		// Out of season — say when it comes back: the next in-season month.
		const now = new Date().getMonth() + 1; // 1..12
		let until = months[0];
		for (let i = 1; i <= 12; i++) {
			const m = ((now - 1 + i) % 12) + 1;
			if (months.indexOf(m) > -1) { until = m; break; }
		}
		const floor = xdata?.seasonal?.floorUsd || 400;
		return `Seasonal listing — hidden until ${MONTH_NAMES[until - 1]} (rates below $${floor}/night off-season)`;
	}
	return `Seasonal listing — live ${seasonalMonthRangeLabel(months)}`;
}
