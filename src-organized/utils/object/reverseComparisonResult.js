/**
 * Reverses the result of a comparison function.
 *
 * This function takes two values and a comparison function (compareValues),
 * then returns the negated result of that comparison. This is useful
 * when you want to invert the sorting order (e.g., from ascending to descending).
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {number} The negated result of the comparison function.
 */
function reverseComparisonResult(firstValue, secondValue) {
  // Negate the result of compareValues to reverse the comparison order
  return -1 * compareValues(firstValue, secondValue);
}

module.exports = reverseComparisonResult;