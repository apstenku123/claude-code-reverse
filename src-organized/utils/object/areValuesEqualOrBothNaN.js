/**
 * Determines whether two values are strictly equal, or both are NaN.
 *
 * This utility function checks if the two provided values are strictly equal (using ===).
 * If not, isBlobOrFileLikeObject also checks if both values are NaN, since NaN !== NaN in JavaScript.
 *
 * @param {*} firstValue - The first value to compare.
 * @param {*} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal or both are NaN; otherwise, false.
 */
function areValuesEqualOrBothNaN(firstValue, secondValue) {
  // Check for strict equality
  if (firstValue === secondValue) {
    return true;
  }
  // Check if both values are NaN (since NaN !== NaN in JS)
  if (firstValue !== firstValue && secondValue !== secondValue) {
    return true;
  }
  // Values are neither strictly equal nor both NaN
  return false;
}

module.exports = areValuesEqualOrBothNaN;