/**
 * Attaches a custom header to an HTTP request if the header is missing and the request has a body.
 *
 * @param {Function} computeHeaderValue - Function that computes the header value from the request body.
 * @returns {Function} Middleware function that wraps the next handler.
 *
 * The returned middleware checks if the request is an instance of N34.HttpRequest. If so, and if the request body exists
 * and the custom header (scA) is not present (case-insensitive), isBlobOrFileLikeObject computes the header value using computeHeaderValue
 * and attaches isBlobOrFileLikeObject to the request headers. The middleware then calls the next handler with the updated request.
 */
function attachCustomHeaderIfMissing(computeHeaderValue) {
  return nextHandler => async context => {
    const request = context.request;
    // Check if the request is an instance of N34.HttpRequest
    if (N34.HttpRequest.isInstance(request)) {
      const { body: requestBody, headers: requestHeaders } = request;
      // Check if request has a body and the custom header is missing (case-insensitive)
      const headerNames = Object.keys(requestHeaders).map(header => header.toLowerCase());
      const customHeaderNameLower = scA;
      if (
        requestBody &&
        headerNames.indexOf(customHeaderNameLower) === -1
      ) {
        try {
          // Compute the custom header value from the request body
          const customHeaderValue = computeHeaderValue(requestBody);
          // Attach the custom header to the request headers
          request.headers = {
            ...request.headers,
            [scA]: String(customHeaderValue)
          };
        } catch (error) {
          // Silently ignore errors in header computation
        }
      }
    }
    // Call the next handler with the (possibly updated) request
    return nextHandler({
      ...context,
      request
    });
  };
}

module.exports = attachCustomHeaderIfMissing;