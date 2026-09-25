// ---------------------------------------------------------------------------
// What to tell a user when a READ failed, so a page never states that a list is
// empty when it simply could not find out. Asana 1218855318680702.
//
// One copy per app, used by every list page that reads a backend (PartnersListView,
// EPartners, Reservations, ListingsBookingpal, the Partners reconnect popup). The
// wording lived in each page until a reviewer pointed out that duplicated strings
// drift silently, because nothing tests wording.
//
//   subject  names what could not be read, as it reads in a sentence:
//            "this partner list", "the external partner list".
//   source   names the system that did not answer. These pages do NOT all talk to
//            the hub — /reservations reads VT-Backend — and a message that blames
//            the wrong system sends someone looking in the wrong place.
//
// 403 is deliberately separate: the session was accepted and the ACCOUNT refused,
// so telling someone to sign in again sends them after a problem they do not have.
// The 400/401 line says "your session" without naming a system, because it is the
// same advice either way.
// ---------------------------------------------------------------------------
export const readErrorMessage = (status, subject = "this list", source = "The hub") => {
  if (status === 403) return `Your account is not allowed to read ${subject}.`
  if (status === 400 || status === 401) {
    return "Your session was not accepted. Sign out and back in, then try again."
  }
  return `${source} did not answer.`
}

export default readErrorMessage
