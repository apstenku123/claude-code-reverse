/**
 * Checks if the provided value is a string and matches the isValidStringPattern validation pattern.
 *
 * @param {string} valueToValidate - The value to check against the isValidStringPattern pattern.
 * @returns {boolean} True if the value is a string and matches the isValidStringPattern pattern; otherwise, false.
 */
function isValidGt6String(valueToValidate) {
  // Ensure the value is a string and matches the vt6.default regular expression pattern
  return typeof valueToValidate === "string" && vt6.default.test(valueToValidate);
}

module.exports = isValidGt6String;