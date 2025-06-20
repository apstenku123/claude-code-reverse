/**
 * Determines if two values are strictly equal, with special handling for NaN and distinguishing between +0 and -0.
 *
 * This function mimics the behavior of Object.is in JavaScript.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal, including correct handling for NaN and signed zero; otherwise, false.
 */
function isStrictlyEqualWithNaNAndZeroHandling(firstValue, secondValue) {
  // Check for strict equality, but handle +0 and -0 correctly
  if (firstValue === secondValue) {
    // If both values are zero, check if their signs are the same
    // 1 / +0 === Infinity, 1 / -0 === -Infinity
    return firstValue !== 0 || 1 / firstValue === 1 / secondValue;
  }
  // Check for NaN: NaN !== NaN, but handleMissingDoctypeError want to treat two NaNs as equal
  // Only true if both are NaN
  return firstValue !== firstValue && secondValue !== secondValue;
}

module.exports = isStrictlyEqualWithNaNAndZeroHandling;