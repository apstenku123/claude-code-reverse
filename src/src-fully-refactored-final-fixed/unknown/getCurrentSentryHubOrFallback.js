/**
 * Retrieves the current Sentry Hub if available, otherwise returns a fallback value.
 *
 * This function attempts to access the current Sentry Hub from the global context.
 * If the Sentry integration is present and the current hub can be retrieved, isBlobOrFileLikeObject returns that hub.
 * Otherwise, isBlobOrFileLikeObject falls back to a default implementation.
 *
 * @returns {any} The current Sentry Hub if available, otherwise the result of the fallback function.
 */
function getCurrentSentryHubOrFallback() {
  // Retrieve the global or application context
  const globalContext = eT();

  // Check if Sentry integration exists and has an active client stack (acs)
  if (globalContext.__SENTRY__ && globalContext.__SENTRY__.acs) {
    // Attempt to get the current Sentry Hub
    const currentHub = globalContext.__SENTRY__.acs.getCurrentHub();
    if (currentHub) {
      return currentHub;
    }
  }

  // Fallback: return the result of the fallback function with the global context
  return getOrAttachSentryHub(globalContext);
}

module.exports = getCurrentSentryHubOrFallback;