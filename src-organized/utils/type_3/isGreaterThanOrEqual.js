/**
 * Checks if the first value is greater than or equal to the second value.
 *
 * @param {number} firstValue - The value to compare on the left side (a >= createPropertyAccessor).
 * @param {number} secondValue - The value to compare on the right side.
 * @returns {boolean} Returns true if firstValue is greater than or equal to secondValue, otherwise false.
 */
function isGreaterThanOrEqual(firstValue, secondValue) {
  // Compare the two values using the greater than or equal to operator
  return firstValue >= secondValue;
}

module.exports = isGreaterThanOrEqual;