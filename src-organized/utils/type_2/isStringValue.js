/**
 * Checks if the provided value is a string (primitive or String object).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a string or String object, otherwise false.
 */
function isStringValue(value) {
  // Check for string primitive or String object
  return typeof value === "string" || value instanceof String;
}

module.exports = isStringValue;