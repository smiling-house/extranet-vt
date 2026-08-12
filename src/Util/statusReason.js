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

export function partnerStatusReason(status, xdata) {
	const s = (status || '').toLowerCase();
	if (s === 'approved') return '';
	const raw = (xdata?.declineReason || '').trim();
	if (s === 'declined') {
		if (!raw) return 'Declined by our onboarding team — contact us if you believe this is a mistake.';
		return friendlyParts(raw).join(' • ');
	}
	if (s === 'pending') {
		return 'Awaiting review by our onboarding team. Note: listings priced below USD 400/night cannot go live.';
	}
	return '';
}
