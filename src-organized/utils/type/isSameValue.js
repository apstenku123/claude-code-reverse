/**
 * Determines whether two values are the same value, following the SameValue algorithm.
 * This is similar to Object.is, treating NaN as equal to NaN and distinguishing between +0 and -0.
 *
 * @param {*} firstValue - The first value to compare.
 * @param {*} secondValue - The second value to compare.
 * @returns {boolean} True if the values are the same value, false otherwise.
 */
function isSameValue(firstValue, secondValue) {
  // Strict equality covers most cases, except for NaN
  // NaN !== NaN, so handleMissingDoctypeError explicitly check if both are NaN
  return firstValue === secondValue || (firstValue !== firstValue && secondValue !== secondValue);
}

module.exports = isSameValue;