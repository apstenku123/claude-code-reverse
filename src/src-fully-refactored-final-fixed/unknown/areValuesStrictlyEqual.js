/**
 * Checks if two values are strictly equal using the === operator.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {boolean} True if both values are strictly equal; otherwise, false.
 */
function areValuesStrictlyEqual(firstValue, secondValue) {
  // Use strict equality to compare the two values
  return firstValue === secondValue;
}

module.exports = areValuesStrictlyEqual;