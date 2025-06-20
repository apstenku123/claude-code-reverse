/**
 * Checks if the provided value is a number and is an integer.
 *
 * @param {number} value - The value to check for integer-ness.
 * @returns {boolean} True if the value is a number and an integer, false otherwise.
 */
function isIntegerValue(value) {
  // Ensure the value is of type 'number' and equals its integer representation
  return typeof value === "number" && value === k4(value);
}

module.exports = isIntegerValue;