/**
 * Determines if the first numeric value is greater than or equal to the second.
 *
 * @param {number} firstValue - The first numeric value to compare.
 * @param {number} secondValue - The second numeric value to compare against.
 * @returns {boolean} True if firstValue is greater than or equal to secondValue, otherwise false.
 */
function isFirstValueGreaterOrEqual(firstValue, secondValue) {
  // Compare the two values and return true if firstValue >= secondValue
  return firstValue >= secondValue;
}

module.exports = isFirstValueGreaterOrEqual;