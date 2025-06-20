/**
 * Checks if the provided value is of type 'number'.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a number, false otherwise.
 */
function isNumber(value) {
  // Use typeof to determine if the input is a number
  return typeof value === "number";
}

module.exports = isNumber;