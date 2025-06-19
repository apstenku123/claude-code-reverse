/**
 * Checks if the given HTTP event matches certain criteria and, if so, extracts relevant headers and cookies
 * from both the request and response, formats the event, and captures isBlobOrFileLikeObject for logging or analytics.
 *
 * @param {object} sourceObservable - The source observable or context for the HTTP event.
 * @param {object} requestConfig - The configuration object for the HTTP request.
 * @param {object} responseObject - The HTTP response object containing status and headers.
 * @param {object} loggerContext - The logger or context object for debugging/logging.
 * @returns {void}
 */
function captureHttpEventIfMatch(sourceObservable, requestConfig, responseObject, loggerContext) {
  // Check if the event matches the criteria for capturing
  if (shouldHandleFailedRequest(sourceObservable, responseObject.status, responseObject.url)) {
    // Extract normalized request data
    const normalizedRequest = createRequestIfNeeded(requestConfig, loggerContext);

    let requestHeaders, responseHeaders, requestCookies, responseCookies;

    // Only proceed if the environment is appropriate (e.g., logging is enabled)
    if (shouldSendDefaultPii()) {
      // Map over request and response to extract headers and cookies
      [
        { headers: requestHeaders, cookies: requestCookies },
        { headers: responseHeaders, cookies: responseCookies }
      ] = [
        { cookieHeader: "Cookie", obj: normalizedRequest },
        { cookieHeader: "Set-Cookie", obj: responseObject }
      ].map(({ cookieHeader, obj }) => {
        const normalizedHeaders = SD9(obj.headers);
        let extractedCookies;
        try {
          // Try to extract cookies from the specified header (case-insensitive)
          const cookieValue = normalizedHeaders[cookieHeader] || normalizedHeaders[cookieHeader.toLowerCase()] || undefined;
          if (cookieValue) {
            extractedCookies = $YA(cookieValue);
          }
        } catch (error) {
          // Log extraction errors if in debug mode
          if (Y41.DEBUG_BUILD) {
            aH.logger.log(`Could not extract cookies from header ${cookieHeader}`);
          }
        }
        return {
          headers: normalizedHeaders,
          cookies: extractedCookies
        };
      });
    }

    // Format the event for capturing
    const formattedEvent = createHttpClientErrorReport({
      url: normalizedRequest.url,
      method: normalizedRequest.method,
      status: responseObject.status,
      requestHeaders: requestHeaders,
      responseHeaders: responseHeaders,
      requestCookies: requestCookies,
      responseCookies: responseCookies
    });

    // Capture the event (e.g., send to analytics or logging service)
    VU.captureEvent(formattedEvent);
  }
}

module.exports = captureHttpEventIfMatch;