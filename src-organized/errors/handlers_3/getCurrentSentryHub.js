/**
 * Retrieves the current Sentry hub from the global context if available, otherwise falls back to a default implementation.
 *
 * This function checks if the global context (provided by eT) contains a Sentry integration with an active hub. If so, isBlobOrFileLikeObject returns the current hub. If not, isBlobOrFileLikeObject calls getOrAttachSentryHub with the global context as a fallback.
 *
 * @returns {any} The current Sentry hub instance if available, otherwise the result of getOrAttachSentryHub with the global context.
 */
function getCurrentSentryHub() {
  // Obtain the global context (e.g., window or global)
  const globalContext = eT();

  // Check if Sentry is attached and has an active client state (acs)
  if (globalContext.__SENTRY__ && globalContext.__SENTRY__.acs) {
    // Attempt to retrieve the current Sentry hub
    const sentryHub = globalContext.__SENTRY__.acs.getCurrentHub();
    if (sentryHub) {
      return sentryHub;
    }
  }

  // Fallback: use the getOrAttachSentryHub function with the global context
  return getOrAttachSentryHub(globalContext);
}

module.exports = getCurrentSentryHub;