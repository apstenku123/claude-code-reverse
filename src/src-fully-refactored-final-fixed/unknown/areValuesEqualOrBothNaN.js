/**
 * Determines if two values are strictly equal, or if both are numbers and both are NaN.
 *
 * This is useful for cases where NaN should be considered equal to NaN,
 * which is not the case with the strict equality operator (===).
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if the values are strictly equal, or both are numbers and both are NaN; otherwise, false.
 */
function areValuesEqualOrBothNaN(firstValue, secondValue) {
  // Check for strict equality first
  if (firstValue === secondValue) {
    return true;
  }

  // If both values are numbers, check if both are NaN
  const bothAreNumbers = typeof firstValue === "number" && typeof secondValue === "number";
  if (bothAreNumbers && isNaN(firstValue) && isNaN(secondValue)) {
    return true;
  }

  // Otherwise, values are not considered equal
  return false;
}

module.exports = areValuesEqualOrBothNaN;