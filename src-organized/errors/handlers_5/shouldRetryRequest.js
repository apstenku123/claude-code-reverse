/**
 * Determines whether a given error or response object indicates that a request should be retried.
 * Handles overloaded errors, custom retry headers, specific HTTP status codes, and custom error types.
 *
 * @param {object} errorOrResponse - The error or response object to evaluate for retry logic.
 * @returns {boolean} True if the request should be retried, false otherwise.
 */
function shouldRetryRequest(errorOrResponse) {
  // Check if the error message contains an overloaded error type
  if (errorOrResponse.message?.includes('"type":"overloaded_error"')) {
    return true;
  }

  // Check for custom retry logic via external function
  if (parseContextLimitError(errorOrResponse)) {
    return true;
  }

  // Check for custom retry header
  const shouldRetryHeader = errorOrResponse.headers?.get("x-should-retry");
  if (shouldRetryHeader === "true" && !R6()) {
    return true;
  }
  if (shouldRetryHeader === "false") {
    return false;
  }

  // Check for custom error type
  if (errorOrResponse instanceof fN) {
    return true;
  }

  // If there is no status, do not retry
  if (!errorOrResponse.status) {
    return false;
  }

  // Retry on specific HTTP status codes
  if (errorOrResponse.status === 408) { // Request Timeout
    return true;
  }
  if (errorOrResponse.status === 409) { // Conflict
    return true;
  }
  if (errorOrResponse.status === 429) { // Too Many Requests
    return !R6();
  }
  if (errorOrResponse.status === 401) { // Unauthorized
    ffA();
    return true;
  }
  // Retry on server errors (status 500 and above)
  if (errorOrResponse.status && errorOrResponse.status >= 500) {
    return true;
  }

  // Default: do not retry
  return false;
}

module.exports = shouldRetryRequest;