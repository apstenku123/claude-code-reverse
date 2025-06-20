/**
 * Captures an HTTP event, extracting headers and cookies from the response if applicable.
 *
 * This function checks if an HTTP response should be captured as an event. If so, isBlobOrFileLikeObject attempts to extract
 * response cookies and headers, then constructs an event object and sends isBlobOrFileLikeObject to the event capture system.
 *
 * @param {any} requestContext - The context or observable related to the HTTP request.
 * @param {XMLHttpRequest} httpResponse - The HTTP response object containing status, headers, and URL.
 * @param {string} httpMethod - The HTTP method used for the request (e.g., 'GET', 'POST').
 * @param {object} uiActionTransaction - The UI action transaction context (e.g., for Sentry tracing).
 * @returns {void}
 */
function captureHttpEventWithHeadersAndCookies(requestContext, httpResponse, httpMethod, uiActionTransaction) {
  // Check if the response should be captured as an event
  if (shouldHandleFailedRequest(requestContext, httpResponse.status, httpResponse.responseURL)) {
    let requestHeaders = undefined;
    let responseCookies = undefined;
    let responseHeaders = undefined;

    // Only extract headers and cookies if the environment allows
    if (shouldSendDefaultPii()) {
      // Attempt to extract cookies from response headers
      try {
        const setCookieHeader =
          httpResponse.getResponseHeader("Set-Cookie") ||
          httpResponse.getResponseHeader("set-cookie") ||
          undefined;
        if (setCookieHeader) {
          responseCookies = $YA(setCookieHeader);
        }
      } catch (cookieExtractionError) {
        if (Y41.DEBUG_BUILD) {
          aH.logger.log("Could not extract cookies from response headers");
        }
      }
      // Attempt to extract all response headers
      try {
        responseHeaders = _D9(httpResponse);
      } catch (headerExtractionError) {
        if (Y41.DEBUG_BUILD) {
          aH.logger.log("Could not extract headers from response");
        }
      }
      // Assign the UI action transaction as request headers context
      requestHeaders = uiActionTransaction;
    }

    // Build the event payload
    const eventPayload = createHttpClientErrorReport({
      url: httpResponse.responseURL,
      method: httpMethod,
      status: httpResponse.status,
      requestHeaders: requestHeaders,
      responseHeaders: responseHeaders,
      responseCookies: responseCookies
    });

    // Send the event to the capture system
    VU.captureEvent(eventPayload);
  }
}

module.exports = captureHttpEventWithHeadersAndCookies;