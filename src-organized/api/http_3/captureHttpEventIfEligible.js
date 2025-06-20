/**
 * Processes an HTTP response and captures an event if the response meets eligibility criteria.
 * Extracts cookies and headers from the response if available, and records the event for monitoring/tracing.
 *
 * @param {any} requestSource - The original request source or context (used for eligibility check)
 * @param {XMLHttpRequest} httpResponse - The HTTP response object (must have .status, .responseURL, .getResponseHeader())
 * @param {string} httpMethod - The HTTP method used for the request (e.g., 'GET', 'POST')
 * @param {object} interactionTransaction - The current interaction transaction context (used for tracing)
 * @returns {void}
 */
function captureHttpEventIfEligible(requestSource, httpResponse, httpMethod, interactionTransaction) {
  // Check if the response is eligible for event capture
  if (shouldHandleFailedRequest(requestSource, httpResponse.status, httpResponse.responseURL)) {
    let requestHeaders = undefined;
    let responseCookies = undefined;
    let responseHeaders = undefined;

    // Only extract headers and cookies if the environment allows (e.g., browser, not SSR)
    if (shouldSendDefaultPii()) {
      // Try to extract cookies from response headers
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
      // Try to extract all response headers
      try {
        responseHeaders = _D9(httpResponse);
      } catch (headerExtractionError) {
        if (Y41.DEBUG_BUILD) {
          aH.logger.log("Could not extract headers from response");
        }
      }
      // Set request headers to the current interaction transaction context
      requestHeaders = interactionTransaction;
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

    // Capture the event for monitoring/tracing
    VU.captureEvent(eventPayload);
  }
}

module.exports = captureHttpEventIfEligible;