/**
 * Returns the provided value if access is permitted; otherwise, returns a redacted placeholder.
 *
 * @param {string} value - The value to potentially return if access is allowed.
 * @returns {string} The original value if access is permitted, or a redacted placeholder if not.
 */
function getRedactedIfNotAllowed(value) {
  // OZ5 is an external function that determines if access is permitted
  const isAccessAllowed = OZ5();
  return isAccessAllowed ? value : "<REDACTED>";
}

module.exports = getRedactedIfNotAllowed;