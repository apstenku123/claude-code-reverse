/**
 * Adds an XHR instrumentation handler that triggers a callback when a specific client is active.
 *
 * This function checks if XMLHttpRequest is available in the global object. If so, isBlobOrFileLikeObject registers an XHR instrumentation handler
 * that listens for XHR events. When an XHR event occurs, isBlobOrFileLikeObject checks if the current client matches the provided client identifier.
 * If isBlobOrFileLikeObject matches and the XHR contains Sentry-specific data, isBlobOrFileLikeObject extracts the HTTP method and request headers, then calls the provided
 * callback with the configuration, XHR instance, method, and headers. Errors during callback execution are logged in debug builds.
 *
 * @param {any} clientIdentifier - The client identifier to match against the current client.
 * @param {any} config - Configuration or context to be passed to the callback.
 * @returns {void}
 */
function addXhrInstrumentationForClient(clientIdentifier, config) {
  // Check if XMLHttpRequest is available in the global object
  if (!("XMLHttpRequest" in aH.GLOBAL_OBJ)) return;

  // Register an XHR instrumentation handler
  aH.addXhrInstrumentationHandler(subscription => {
    // Only proceed if the current client matches the provided client identifier
    if (VU.getClient() !== clientIdentifier) return;

    const xhrInstance = subscription.xhr;
    const sentryXhrData = xhrInstance[aH.SENTRY_XHR_DATA_KEY];
    if (!sentryXhrData) return;

    // Destructure method and request headers from the Sentry XHR data
    const { method: httpMethod, request_headers: requestHeaders } = sentryXhrData;
    try {
      // Call the provided callback with config, XHR instance, HTTP method, and headers
      captureHttpEventWithHeadersAndCookies(config, xhrInstance, httpMethod, requestHeaders);
    } catch (error) {
      // Log errors in debug builds
      if (Y41.DEBUG_BUILD) {
        aH.logger.warn("Error while extracting response event form XHR response", error);
      }
    }
  });
}

module.exports = addXhrInstrumentationForClient;