/**
 * Determines if two values are the same value, following the SameValue algorithm (like Object.is).
 * This function correctly handles edge cases such as distinguishing between +0 and -0, and considers NaN equal to NaN.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if the values are the same value according to the SameValue algorithm; otherwise, false.
 */
function isSameValue(firstValue, secondValue) {
  // Check if values are strictly equal
  if (firstValue === secondValue) {
    // Distinguish between +0 and -0
    // 1 / +0 === Infinity, 1 / -0 === -Infinity
    return firstValue !== 0 || 1 / firstValue === 1 / secondValue;
  }
  // Check if both values are NaN (since NaN !== NaN)
  return firstValue !== firstValue && secondValue !== secondValue;
}

module.exports = isSameValue;
