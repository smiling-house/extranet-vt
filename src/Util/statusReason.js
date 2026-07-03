// Human-readable status explanation shown to PARTNERS on listing rows.
// Admins keep seeing the raw internal reason (e.g. "TOO CHEAP") next to it.
// Keep this file identical in extranet-sh and extranet-vt.
const REASON_MAP = {
	'TOO CHEAP': 'Below the USD 400/night minimum base rate — update the nightly rate in your PMS and it will go live on the next sync.',
};

export function partnerStatusReason(status, xdata) {
	const s = (status || '').toLowerCase();
	if (s === 'approved') return '';
	const raw = (xdata?.declineReason || '').trim();
	if (raw && REASON_MAP[raw.toUpperCase()]) return REASON_MAP[raw.toUpperCase()];
	if (s === 'declined') {
		return raw ? `Reason: ${raw}` : 'Declined by our onboarding team — contact us if you believe this is a mistake.';
	}
	if (s === 'pending') {
		return 'Awaiting review by our onboarding team. Note: listings priced below USD 400/night cannot go live.';
	}
	return '';
}
