/**
 * Checks if the provided value is a non-negative integer less than or equal to the global maximum limit Kk2.
 *
 * @param {number} value - The value to validate as a non-negative integer within the allowed limit.
 * @returns {boolean} True if the value is a non-negative integer and less than or equal to Kk2, otherwise false.
 */
function isValidNonNegativeIntegerWithinLimit(value) {
  // Ensure the value is a number
  if (typeof value !== "number") {
    return false;
  }

  // Check that the value is a non-negative integer
  if (value < 0 || value % 1 !== 0) {
    return false;
  }

  // Check that the value does not exceed the maximum allowed limit
  if (value > Kk2) {
    return false;
  }

  return true;
}

module.exports = isValidNonNegativeIntegerWithinLimit;