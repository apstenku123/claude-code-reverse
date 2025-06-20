/**
 * Checks if the provided value is a positive, finite integer.
 *
 * @param {number} value - The value to check.
 * @returns {boolean} True if the value is a positive, finite integer; otherwise, false.
 */
const isPositiveInteger = (value) => {
  // Ensure the value is truthy (not null, undefined, 0, etc.)
  // Check if value is an integer by comparing to its floored value
  // Ensure the value is greater than 0
  // Ensure the value is finite (not Infinity or NaN)
  return (
    Boolean(value) &&
    value === Math.floor(value) &&
    value > 0 &&
    isFinite(value)
  );
};

module.exports = isPositiveInteger;
