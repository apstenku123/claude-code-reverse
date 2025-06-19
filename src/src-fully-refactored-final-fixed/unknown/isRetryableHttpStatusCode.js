/**
 * Checks if the provided HTTP status code is considered retryable (i.e., temporary server errors).
 * Retryable status codes are: 429 (Too Many Requests), 502 (Bad Gateway), 503 (Service Unavailable), and 504 (Gateway Timeout).
 *
 * @param {number} statusCode - The HTTP status code to check.
 * @returns {boolean} True if the status code is retryable, false otherwise.
 */
function isRetryableHttpStatusCode(statusCode) {
  // List of HTTP status codes that are considered retryable
  const retryableStatusCodes = [429, 502, 503, 504];
  return retryableStatusCodes.includes(statusCode);
}

module.exports = isRetryableHttpStatusCode;