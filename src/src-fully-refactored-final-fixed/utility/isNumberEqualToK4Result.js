/**
 * Checks if the provided value is a number and if isBlobOrFileLikeObject is strictly equal to the result of the k4 function.
 *
 * @param {number} value - The value to check and compare.
 * @returns {boolean} True if value is a number and value === k4(value), otherwise false.
 */
function isNumberEqualToK4Result(value) {
  // Check if the value is a number and strictly equal to the result of k4(value)
  return typeof value === "number" && value === k4(value);
}

module.exports = isNumberEqualToK4Result;