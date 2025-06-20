/**
 * Determines if a given status code is considered 'supported' based on specific criteria.
 *
 * Supported codes are:
 *   - Any code from 1000 to 1014, except 1004, 1005, and 1006
 *   - Any code from 3000 to 4999 (inclusive)
 *
 * @param {number} statusCode - The status code to check.
 * @returns {boolean} True if the status code is supported, false otherwise.
 */
function isSupportedStatusCode(statusCode) {
  // Check if statusCode is in the range 1000-1014, excluding 1004, 1005, 1006
  if (statusCode >= 1000 && statusCode < 1015) {
    return statusCode !== 1004 && statusCode !== 1005 && statusCode !== 1006;
  }
  // Check if statusCode is in the range 3000-4999 (inclusive)
  return statusCode >= 3000 && statusCode <= 4999;
}

module.exports = isSupportedStatusCode;
