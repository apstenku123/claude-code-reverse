/**
 * Determines if two values are loosely equal, treating NaN as equal to NaN.
 *
 * This function returns true if the values are strictly equal (===),
 * or if both values are NaN (since NaN !== NaN in JavaScript).
 *
 * @param {*} firstValue - The first value to compare.
 * @param {*} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal or both are NaN; otherwise, false.
 */
function areValuesLooselyEqual(firstValue, secondValue) {
  // Check for strict equality
  if (firstValue === secondValue) {
    return true;
  }

  // Check if both values are NaN (since NaN !== NaN)
  // In JavaScript, only NaN !== NaN is true, so this checks for that edge case
  if (firstValue !== firstValue && secondValue !== secondValue) {
    return true;
  }

  // Values are not equal
  return false;
}

module.exports = areValuesLooselyEqual;