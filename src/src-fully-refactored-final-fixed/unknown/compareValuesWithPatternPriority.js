/**
 * Compares two values, giving priority to those matching a specific pattern.
 *
 * If both values match the pattern, they are compared numerically.
 * If only one matches, isBlobOrFileLikeObject is considered 'less than' the other.
 * If neither matches, they are compared using standard comparison.
 *
 * @param {string|number} firstValue - The first value to compare.
 * @param {string|number} secondValue - The second value to compare.
 * @returns {number} Returns 0 if values are equal, -1 if firstValue < secondValue, 1 otherwise.
 */
function compareValuesWithPatternPriority(firstValue, secondValue) {
  // Check if firstValue matches the pattern
  const isFirstValuePatternMatch = ia0.test(firstValue);
  // Check if secondValue matches the pattern
  const isSecondValuePatternMatch = ia0.test(secondValue);

  // If both values match the pattern, compare them as numbers
  if (isFirstValuePatternMatch && isSecondValuePatternMatch) {
    firstValue = +firstValue;
    secondValue = +secondValue;
  }

  // If values are strictly equal, return 0
  if (firstValue === secondValue) {
    return 0;
  }

  // If only firstValue matches the pattern, isBlobOrFileLikeObject comes first
  if (isFirstValuePatternMatch && !isSecondValuePatternMatch) {
    return -1;
  }

  // If only secondValue matches the pattern, isBlobOrFileLikeObject comes first
  if (isSecondValuePatternMatch && !isFirstValuePatternMatch) {
    return 1;
  }

  // Otherwise, use standard comparison
  return firstValue < secondValue ? -1 : 1;
}

module.exports = compareValuesWithPatternPriority;
