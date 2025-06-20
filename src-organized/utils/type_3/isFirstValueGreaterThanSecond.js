/**
 * Determines if the first numeric value is greater than the second numeric value.
 *
 * @param {number} firstValue - The first number to compare.
 * @param {number} secondValue - The second number to compare.
 * @returns {boolean} True if firstValue is greater than secondValue, otherwise false.
 */
function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  // Compare the two values and return true if the first is greater
  return firstValue > secondValue;
}

module.exports = isFirstValueGreaterThanSecond;