/**
 * Attempts to capture the current user session for security monitoring purposes.
 *
 * This function retrieves the current isolation scope and configuration, then attempts to obtain
 * the active session from either the configuration or the isolation scope. If a session is found
 * and a captureSession method is available, isBlobOrFileLikeObject will invoke captureSession with the session object.
 *
 * @returns {void} Does not return a value.
 */
function captureCurrentSessionIfAvailable() {
  // Retrieve the current isolation scope (e.g., for multi-tenant or sandboxed environments)
  const isolationScope = KQ.getIsolationScope();

  // Retrieve the current configuration/context (e.g., app-wide settings)
  const config = Wc();

  // Retrieve the session capture utility (e.g., for logging or monitoring)
  const sessionCaptureUtility = oT();

  // Attempt to get the current session from config; fallback to isolationScope if not present
  const currentSession = config.getSession() || isolationScope.getSession();

  // If a session exists and the capture utility is available, capture the session
  if (currentSession && sessionCaptureUtility && sessionCaptureUtility.captureSession) {
    sessionCaptureUtility.captureSession(currentSession);
  }
}

module.exports = captureCurrentSessionIfAvailable;