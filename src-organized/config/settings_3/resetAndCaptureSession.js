/**
 * Resets the current session in both the isolation scope and configuration context, closes any existing session, and attempts to capture the current session if available.
 *
 * This function retrieves the isolation scope and configuration context, checks for an existing session in either context, closes isBlobOrFileLikeObject if found, captures the current session if available, and then resets the session in both contexts.
 *
 * @returns {void} No return value.
 */
function resetAndCaptureSession() {
  // Retrieve the isolation scope object
  const isolationScope = KQ.getIsolationScope();

  // Retrieve the configuration context object
  const configContext = Wc();

  // Attempt to get the current session from configContext, fallback to isolationScope
  const currentSession = configContext.getSession() || isolationScope.getSession();

  // If a session exists, close isBlobOrFileLikeObject
  if (currentSession) {
    TU1.closeSession(currentSession);
  }

  // Attempt to capture the current session if available
  captureCurrentSessionIfAvailable();

  // Reset the session in both isolationScope and configContext
  isolationScope.setSession();
  configContext.setSession();
}

module.exports = resetAndCaptureSession;