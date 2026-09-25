// ---------------------------------------------------------------------------
// Retry a READ a couple of times before giving up on it. Asana 1218855318680702.
//
// Praveen's requirement: a page should load its contents, not show an error and wait
// for someone to refresh. The hub session transport already replays ONE request when
// the failure was a missing session (src/Util/hubSession.js), which covers a hub
// restart — but nothing retried a 502, a timeout or a dropped connection, and nothing
// retried at all on the pages that read VT-Backend instead of the hub. Those parked on
// an error state that a human had to clear.
//
// Reads only. Never wrap a POST/PUT/DELETE in this: a write that appears to fail may
// already have landed, and repeating it is how you get two of something.
//
// 403 is not retried — the account is refused and a second ask is refused too. Everything
// else is, including 400/401: when the hub is restarting its session route answers for a
// couple of seconds (DOWN_BACKOFF_MS), so the later attempt is the one that succeeds.
//
// Worst case before an error is shown: the sum of DELAYS_MS, ~3.3s, with the page's own
// spinner up. That is the price of not making someone refresh.
// ---------------------------------------------------------------------------
const DELAYS_MS = [900, 2400]

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export const shouldRetryRead = (error) => {
  const status = error && error.response && error.response.status
  if (status === 403) return false
  return true
}

/**
 * `read` is an async function that performs the request and throws on failure — throw
 * for a body-level failure too (the hub's `success: false`), so that is retried as well.
 * Returns whatever `read` returns; rethrows the LAST error when every attempt failed.
 */
export const retryRead = async (read, opts = {}) => {
  const delays = opts.delays || DELAYS_MS
  let lastError
  for (let attempt = 0; attempt <= delays.length; attempt += 1) {
    try {
      return await read(attempt)
    } catch (e) {
      lastError = e
      if (attempt === delays.length || !shouldRetryRead(e)) break
      await wait(delays[attempt])
    }
  }
  throw lastError
}

export default retryRead
