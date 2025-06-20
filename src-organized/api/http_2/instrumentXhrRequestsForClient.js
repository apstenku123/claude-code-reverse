/**
 * Instruments XMLHttpRequests for a specific client and processes response events using a handler.
 *
 * @param {any} targetClient - The client instance to match against the current client.
 * @param {any} handlerConfig - Configuration or context to pass to the response event handler.
 * @returns {void}
 *
 * This function adds an instrumentation handler for XHR requests if XMLHttpRequest is available in the global object.
 * It ensures that only requests associated with the specified client are processed. For each matching XHR event,
 * isBlobOrFileLikeObject extracts the HTTP method and request headers, then invokes the captureHttpEventWithHeadersAndCookies handler. Errors during processing are logged in debug mode.
 */
function instrumentXhrRequestsForClient(targetClient, handlerConfig) {
  // Check if XMLHttpRequest is available in the global object
  if (!("XMLHttpRequest" in aH.GLOBAL_OBJ)) return;

  // Add an instrumentation handler for XHR events
  aH.addXhrInstrumentationHandler(subscription => {
    // Only process events for the specified client
    if (VU.getClient() !== targetClient) return;

    const xhrInstance = subscription.xhr;
    const sentryXhrData = xhrInstance[aH.SENTRY_XHR_DATA_KEY];
    if (!sentryXhrData) return;

    // Destructure method and request headers from the Sentry XHR data
    const { method: httpMethod, request_headers: requestHeaders } = sentryXhrData;
    try {
      // Invoke the response event handler with the provided config, XHR instance, method, and headers
      captureHttpEventWithHeadersAndCookies(handlerConfig, xhrInstance, httpMethod, requestHeaders);
    } catch (error) {
      // Log any errors during extraction in debug mode
      if (Y41.DEBUG_BUILD) {
        aH.logger.warn("Error while extracting response event form XHR response", error);
      }
    }
  });
}

module.exports = instrumentXhrRequestsForClient;