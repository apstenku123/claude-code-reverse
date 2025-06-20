/**
 * Captures an HTTP event if isBlobOrFileLikeObject matches certain criteria, extracting headers and cookies as needed.
 *
 * @param {any} requestContext - The context or observable representing the request source.
 * @param {object} httpResponse - The HTTP response object, expected to have status, responseURL, and getResponseHeader().
 * @param {string} httpMethod - The HTTP method used for the request (e.g., 'GET', 'POST').
 * @param {object} requestHeaders - The request headers or context for the event (may be a transaction context).
 * @returns {void}
 */
function captureHttpEventIfRelevant(requestContext, httpResponse, httpMethod, requestHeaders) {
  // Check if the response is relevant for capturing
  if (shouldHandleFailedRequest(requestContext, httpResponse.status, httpResponse.responseURL)) {
    let extractedRequestHeaders = undefined;
    let extractedResponseCookies = undefined;
    let extractedResponseHeaders = undefined;

    // Only extract headers and cookies if the environment allows
    if (shouldSendDefaultPii()) {
      // Try to extract cookies from response headers
      try {
        const setCookieHeader =
          httpResponse.getResponseHeader("Set-Cookie") ||
          httpResponse.getResponseHeader("set-cookie") ||
          undefined;
        if (setCookieHeader) {
          extractedResponseCookies = $YA(setCookieHeader);
        }
      } catch (cookieExtractionError) {
        // Log extraction failure in debug builds
        if (Y41.DEBUG_BUILD) {
          aH.logger.log("Could not extract cookies from response headers");
        }
      }
      // Try to extract all response headers
      try {
        extractedResponseHeaders = _D9(httpResponse);
      } catch (headerExtractionError) {
        // Log extraction failure in debug builds
        if (Y41.DEBUG_BUILD) {
          aH.logger.log("Could not extract headers from response");
        }
      }
      // Use the provided request headers/context
      extractedRequestHeaders = requestHeaders;
    }

    // Construct the event payload
    const eventPayload = createHttpClientErrorReport({
      url: httpResponse.responseURL,
      method: httpMethod,
      status: httpResponse.status,
      requestHeaders: extractedRequestHeaders,
      responseHeaders: extractedResponseHeaders,
      responseCookies: extractedResponseCookies
    });

    // Capture the event
    VU.captureEvent(eventPayload);
  }
}

module.exports = captureHttpEventIfRelevant;