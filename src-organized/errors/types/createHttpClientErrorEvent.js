/**
 * Constructs a detailed error event object for HTTP client errors, including request and response context.
 * Also attaches an exception mechanism describing the error as an unhandled HTTP client exception.
 *
 * @param {Object} httpError - The HTTP error object containing request and response details.
 * @param {number} httpError.status - The HTTP response status code.
 * @param {string} httpError.url - The URL of the HTTP request.
 * @param {string} httpError.method - The HTTP request method (e.g., GET, POST).
 * @param {Object} httpError.requestHeaders - The headers sent with the HTTP request.
 * @param {Object} httpError.requestCookies - The cookies sent with the HTTP request.
 * @param {Object} httpError.responseHeaders - The headers received in the HTTP response.
 * @param {Object} httpError.responseCookies - The cookies received in the HTTP response.
 * @returns {Object} The constructed error event object, enriched with exception mechanism metadata.
 */
function createHttpClientErrorEvent(httpError) {
  // Create a descriptive error message including the status code
  const errorMessage = `HTTP Client Error with status code: ${httpError.status}`;

  // Build the error event object with detailed context
  const errorEvent = {
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

  // Attach exception mechanism metadata indicating this is an unhandled HTTP client error
  aH.addExceptionMechanism(errorEvent, {
    type: "http.client",
    handled: false
  });

  return errorEvent;
}

module.exports = createHttpClientErrorEvent;
