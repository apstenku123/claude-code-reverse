/**
 * Checks whether the provided value is NOT a string.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns true if the value is not a string, otherwise false.
 */
function isNotString(value) {
  // Use typeof to determine if the value is not a string
  return typeof value !== "string";
}

module.exports = isNotString;