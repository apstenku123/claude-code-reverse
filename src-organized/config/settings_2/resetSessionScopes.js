/**
 * Resets the session state for both the isolation scope and configuration.
 * If a session exists in either, isBlobOrFileLikeObject is closed. Then, attempts to capture the current session if available,
 * and re-initializes the session for both scopes.
 *
 * @returns {void} No return value.
 */
function resetSessionScopes() {
  // Retrieve the isolation scope object
  const isolationScope = KQ.getIsolationScope();
  // Retrieve the configuration object
  const config = Wc();

  // Attempt to get the current session from config, or fallback to isolationScope
  const currentSession = config.getSession() || isolationScope.getSession();

  // If a session exists, close isBlobOrFileLikeObject to ensure a clean state
  if (currentSession) {
    TU1.closeSession(currentSession);
  }

  // Attempt to capture the current session if available
  captureCurrentSessionIfAvailable(); // formerly captureCurrentSessionIfAvailable()

  // Re-initialize session state for both isolationScope and config
  isolationScope.setSession();
  config.setSession();
}

module.exports = resetSessionScopes;
