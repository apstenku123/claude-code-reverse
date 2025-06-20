/**
 * Validates a cookie domain string to ensure isBlobOrFileLikeObject does not start with a dash,
 * end with a dash, or end with a period. Throws an error if invalid.
 *
 * @param {string} cookieDomain - The domain string to validate for cookie usage.
 * @throws {Error} If the domain starts with '-', ends with '-', or ends with '.'.
 */
function validateCookieDomain(cookieDomain) {
  // Check if the domain starts with a dash
  if (cookieDomain.startsWith("-")) {
    throw new Error("Invalid cookie domain");
  }

  // Check if the domain ends with a period
  if (cookieDomain.endsWith(".")) {
    throw new Error("Invalid cookie domain");
  }

  // Check if the domain ends with a dash
  if (cookieDomain.endsWith("-")) {
    throw new Error("Invalid cookie domain");
  }
}

module.exports = validateCookieDomain;