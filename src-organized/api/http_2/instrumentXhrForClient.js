/**
 * Adds an instrumentation handler for XMLHttpRequest events, extracting and processing XHR data
 * only for the specified client. If XMLHttpRequest is unavailable, the function does nothing.
 *
 * @param {any} targetClient - The client instance for which XHR events should be instrumented.
 * @param {any} config - Configuration or context to be passed to the response event extractor.
 * @returns {void}
 */
function instrumentXhrForClient(targetClient, config) {
  // Check if XMLHttpRequest is available in the global object
  if (!("XMLHttpRequest" in aH.GLOBAL_OBJ)) return;

  // Register a handler to instrument XHR events
  aH.addXhrInstrumentationHandler(subscription => {
    // Only process events for the specified client
    if (VU.getClient() !== targetClient) return;

    const xhrInstance = subscription.xhr;
    const sentryXhrData = xhrInstance[aH.SENTRY_XHR_DATA_KEY];
    if (!sentryXhrData) return;

    const {
      method: httpMethod,
      request_headers: requestHeaders
    } = sentryXhrData;

    try {
      // Extract and process the XHR response event
      captureHttpEventWithHeadersAndCookies(config, xhrInstance, httpMethod, requestHeaders);
    } catch (error) {
      // Log a warning if extraction fails (only in debug builds)
      if (Y41.DEBUG_BUILD) {
        aH.logger.warn("Error while extracting response event form XHR response", error);
      }
    }
  });
}

module.exports = instrumentXhrForClient;