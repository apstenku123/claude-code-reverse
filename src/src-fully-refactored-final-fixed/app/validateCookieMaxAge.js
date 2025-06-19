/**
 * Validates that the provided max-age value for a cookie is non-negative.
 * Throws an error if the value is negative, as negative max-age values are invalid for cookies.
 *
 * @param {number} maxAge - The max-age value (in seconds) to validate for a cookie.
 * @throws {Error} Throws an error if maxAge is negative.
 */
function validateCookieMaxAge(maxAge) {
  // Check if the maxAge is negative
  if (maxAge < 0) {
    throw new Error("Invalid cookie max-age");
  }
}

module.exports = validateCookieMaxAge;