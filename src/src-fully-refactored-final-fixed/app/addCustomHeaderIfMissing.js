/**
 * Adds a custom header to an HTTP request if the header is missing and the request has a body.
 *
 * @param {Function} headerValueGenerator - Function that generates the header value from the request body.
 * @returns {Function} Middleware function that processes the request and adds the custom header if needed.
 */
function addCustomHeaderIfMissing(headerValueGenerator) {
  return nextMiddleware => async context => {
    const request = context.request;
    // Check if the request is an instance of HttpRequest
    if (N34.HttpRequest.isInstance(request)) {
      const { body: requestBody, headers: requestHeaders } = request;
      // Only proceed if there is a body and the custom header is not present
      const headerNames = Object.keys(requestHeaders).map(headerName => headerName.toLowerCase());
      if (requestBody && headerNames.indexOf(scA) === -1) {
        try {
          // Generate the header value using the provided generator function
          const generatedHeaderValue = headerValueGenerator(requestBody);
          // Add the custom header to the request headers
          request.headers = {
            ...request.headers,
            [scA]: String(generatedHeaderValue)
          };
        } catch (error) {
          // Silently ignore errors from header value generation
        }
      }
    }
    // Pass the (possibly modified) request to the next middleware
    return nextMiddleware({
      ...context,
      request
    });
  };
}

module.exports = addCustomHeaderIfMissing;