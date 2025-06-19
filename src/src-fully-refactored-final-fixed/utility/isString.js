/**
 * Checks if the provided value is of type string.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 */
function isString(value) {
  // Use typeof operator to determine if the value is a string
  return typeof value === "string";
}

module.exports = isString;