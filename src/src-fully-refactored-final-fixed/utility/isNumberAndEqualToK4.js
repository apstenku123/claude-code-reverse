/**
 * Checks if the provided value is a number and strictly equal to the result of k4(value).
 *
 * @param {number} value - The value to check.
 * @returns {boolean} True if value is a number and value === k4(value), otherwise false.
 */
function isNumberAndEqualToK4(value) {
  // Ensure the value is of type 'number' and strictly equal to k4(value)
  return typeof value === "number" && value === k4(value);
}

module.exports = isNumberAndEqualToK4;