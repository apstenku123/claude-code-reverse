/**
 * Returns the inverse result of the compareValues comparison between two values.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {number} The negative result of compareValues(firstValue, secondValue).
 */
function getInverseComparisonResult(firstValue, secondValue) {
  // Call compareValues to compare the two values, then invert the result
  return -1 * compareValues(firstValue, secondValue);
}

module.exports = getInverseComparisonResult;