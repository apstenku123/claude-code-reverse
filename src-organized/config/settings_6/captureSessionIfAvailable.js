/**
 * Attempts to capture the current user session for security purposes.
 *
 * This function retrieves the current isolation scope and configuration, then attempts to obtain the active session
 * from either the configuration or the isolation scope. If a session and a session capture utility are available,
 * isBlobOrFileLikeObject invokes the capture method to record the session.
 *
 * @returns {void} This function does not return a value.
 */
function captureSessionIfAvailable() {
  // Retrieve the current isolation scope object (provides session context)
  const isolationScope = KQ.getIsolationScope();

  // Retrieve the current configuration object (may provide session context)
  const config = Wc();

  // Retrieve the session capture utility (may provide captureSession method)
  const sessionCaptureUtility = oT();

  // Attempt to get the current session from config; fallback to isolationScope if not available
  const currentSession = config.getSession() || isolationScope.getSession();

  // If both a session and a capture utility with captureSession method exist, capture the session
  if (currentSession && sessionCaptureUtility && sessionCaptureUtility.captureSession) {
    sessionCaptureUtility.captureSession(currentSession);
  }
}

module.exports = captureSessionIfAvailable;