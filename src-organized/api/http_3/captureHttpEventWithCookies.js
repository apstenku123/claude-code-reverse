/**
 * Captures an HTTP event with detailed request and response headers and cookies, if the event matches certain criteria.
 *
 * @param {object} sourceObservable - The source observable or context for the event.
 * @param {object} requestConfig - The configuration object for the HTTP request.
 * @param {object} httpResponse - The HTTP response object, containing status and url.
 * @param {object} requestInfo - Additional information about the request.
 * @returns {void}
 */
function captureHttpEventWithCookies(sourceObservable, requestConfig, httpResponse, requestInfo) {
  // Check if the event should be captured based on status and URL
  if (shouldHandleFailedRequest(sourceObservable, httpResponse.status, httpResponse.url)) {
    // Extract normalized request data
    const normalizedRequest = createRequestIfNeeded(requestConfig, requestInfo);
    let requestHeaders, responseHeaders, requestCookies, responseCookies;

    // Only proceed if the environment supports cookie extraction
    if (shouldSendDefaultPii()) {
      // Map over request and response to extract headers and cookies
      [
        { headers: requestHeaders, cookies: requestCookies },
        { headers: responseHeaders, cookies: responseCookies }
      ] = [
        { cookieHeader: "Cookie", obj: normalizedRequest },
        { cookieHeader: "Set-Cookie", obj: httpResponse }
      ].map(({ cookieHeader, obj }) => {
        const headersObject = SD9(obj.headers);
        let extractedCookies;
        try {
          // Attempt to extract cookies from the appropriate header (case-insensitive)
          const headerValue = headersObject[cookieHeader] || headersObject[cookieHeader.toLowerCase()] || undefined;
          if (headerValue) {
            extractedCookies = $YA(headerValue);
          }
        } catch (error) {
          // Log extraction failures in debug mode
          if (Y41.DEBUG_BUILD) {
            aH.logger.log(`Could not extract cookies from header ${cookieHeader}`);
          }
        }
        return {
          headers: headersObject,
          cookies: extractedCookies
        };
      });
    }

    // Prepare the event payload with all relevant details
    const eventPayload = createHttpClientErrorReport({
      url: normalizedRequest.url,
      method: normalizedRequest.method,
      status: httpResponse.status,
      requestHeaders: requestHeaders,
      responseHeaders: responseHeaders,
      requestCookies: requestCookies,
      responseCookies: responseCookies
    });

    // Capture the event
    VU.captureEvent(eventPayload);
  }
}

module.exports = captureHttpEventWithCookies;