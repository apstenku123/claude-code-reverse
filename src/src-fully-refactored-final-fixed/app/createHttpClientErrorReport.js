/**
 * Constructs a detailed error report object for HTTP client errors, including request and response context.
 *
 * @param {Object} httpError - The HTTP error object containing details about the failed request and response.
 * @param {number} httpError.status - The HTTP status code returned by the server.
 * @param {string} httpError.url - The URL of the HTTP request.
 * @param {string} httpError.method - The HTTP method used for the request (e.g., 'GET', 'POST').
 * @param {Object} httpError.requestHeaders - The headers sent with the HTTP request.
 * @param {Object} httpError.requestCookies - The cookies sent with the HTTP request.
 * @param {Object} httpError.responseHeaders - The headers received in the HTTP response.
 * @param {Object} httpError.responseCookies - The cookies received in the HTTP response.
 * @returns {Object} An error report object containing message, exception, request, and response context.
 */
function createHttpClientErrorReport(httpError) {
  // Construct a descriptive error message based on the HTTP status code
  const errorMessage = `HTTP Client Error with status code: ${httpError.status}`;

  // Build the error report object with detailed context
  const errorReport = {
    message: errorMessage,
    exception: {
      values: [
        {
          type: "Error",
          value: errorMessage
        }
      ]
    },
    request: {
      url: httpError.url,
      method: httpError.method,
      headers: httpError.requestHeaders,
      cookies: httpError.requestCookies
    },
    contexts: {
      response: {
        status_code: httpError.status,
        headers: httpError.responseHeaders,
        cookies: httpError.responseCookies,
        // Calculate the response body size using the external getContentLengthFromHeaders function
        body_size: getContentLengthFromHeaders(httpError.responseHeaders)
      }
    }
  };

  // Attach additional exception mechanism metadata using an external utility
  aH.addExceptionMechanism(errorReport, {
    type: "http.client",
    handled: false
  });

  return errorReport;
}

module.exports = createHttpClientErrorReport;