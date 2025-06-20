/**
 * Determines if a given status code is considered valid based on specific criteria.
 *
 * Valid codes are:
 *   - Any code between 1000 (inclusive) and 1015 (exclusive),
 *     except for 1004, 1005, and 1006.
 *   - Any code between 3000 and 4999 (inclusive).
 *
 * @param {number} statusCode - The status code to validate.
 * @returns {boolean} True if the status code is valid, false otherwise.
 */
function isValidStatusCode(statusCode) {
  // Check if statusCode is in the range 1000-1014 (inclusive), excluding 1004, 1005, and 1006
  if (statusCode >= 1000 && statusCode < 1015) {
    return statusCode !== 1004 && statusCode !== 1005 && statusCode !== 1006;
  }
  // Check if statusCode is in the range 3000-4999 (inclusive)
  return statusCode >= 3000 && statusCode <= 4999;
}

module.exports = isValidStatusCode;