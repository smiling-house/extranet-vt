// ---------------------------------------------------------------------------
// Extranet hub-session settings. Asana 1218458529003876.
// Imported by src/index.js RIGHT AFTER './Util/hubSession'.
//
// Before login (login, /qr, forgot password, signup) the extranet called the hubs with the
// bundled token (destinations list, "resend access details"). Those calls now carry a
// PUBLIC session, which the hub accepts only on its public allowlist, so they keep working
// as before. Logged-in partners use their partner session; admins their admin session.
// ---------------------------------------------------------------------------
import { configureHubSessions } from './hubSession'

configureHubSessions({ publicSessions: true })
