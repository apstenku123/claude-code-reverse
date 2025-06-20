/**
 * Validates that the provided value is a positive integer.
 * Throws an error if the value is not a number, not an integer, or is negative.
 *
 * @param {string} parameterName - The name of the parameter being validated (used in error messages).
 * @param {number} value - The value to validate as a positive integer.
 * @returns {number} The validated positive integer value.
 * @throws {M9} Throws an error if the value is not a positive integer.
 */
function validatePositiveInteger(parameterName, value) {
  // Check if the value is a number and an integer
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new M9(`${parameterName} must be an integer`);
  }
  // Check if the value is non-negative
  if (value < 0) {
    throw new M9(`${parameterName} must be a positive integer`);
  }
  // Return the validated value
  return value;
}

module.exports = validatePositiveInteger;