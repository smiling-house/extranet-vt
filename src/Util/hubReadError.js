// ---------------------------------------------------------------------------
// What to tell a user when a hub READ failed, so a page never states that a list
// is empty when it simply could not find out. Asana 1218855318680702.
//
// One copy per app, used by every list page that reads the hub (PartnersListView,
// EPartners). The wording lived in each page until a reviewer pointed out that
// duplicated strings drift silently, because nothing tests wording.
//
// `subject` names the thing that could not be read, as it reads in a sentence:
// "this partner list", "the external partner list". The caller's heading already
// says WHAT failed ("Could not load partners"), so this is the line underneath
// and does not repeat it.
//
// 403 is deliberately separate: the hub accepted the session and refused the
// ACCOUNT, so telling someone to sign in again sends them after a problem they
// do not have.
// ---------------------------------------------------------------------------
export const hubReadErrorMessage = (status, subject = "this list") => {
  if (status === 403) return `Your account is not allowed to read ${subject}.`
  if (status === 400 || status === 401) {
    return "Your session with the hub was not accepted. Sign out and back in, then try again."
  }
  return "The hub did not answer."
}

export default hubReadErrorMessage
