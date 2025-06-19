/**
 * Determines if two values are loosely equal, treating NaN as equal to NaN.
 *
 * This function returns true if:
 *   - The two values are strictly equal (===), or
 *   - Both values are NaN (since NaN !== NaN in JavaScript, this checks for that case)
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal or both are NaN; otherwise, false.
 */
function areValuesLooselyEqual(firstValue, secondValue) {
  // Check for strict equality, or if both values are NaN
  return firstValue === secondValue || (firstValue !== firstValue && secondValue !== secondValue);
}

module.exports = areValuesLooselyEqual;