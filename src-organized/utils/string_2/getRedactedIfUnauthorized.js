/**
 * Returns the provided value if the user is authorized, otherwise returns a redacted placeholder.
 *
 * @param {string} value - The value to return if authorized.
 * @returns {string} The original value if authorized, otherwise a redacted string.
 */
function getRedactedIfUnauthorized(value) {
  // OZ5 is an external function that determines if the user is authorized
  const isAuthorized = OZ5();
  return isAuthorized ? value : "<REDACTED>";
}

module.exports = getRedactedIfUnauthorized;