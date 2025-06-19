/**
 * Compares two values, optionally treating them as numbers if they match a specific pattern.
 *
 * If both values match the pattern defined by `ia0`, they are converted to numbers before comparison.
 * If only one matches, that value is considered 'less' or 'greater' depending on which one isBlobOrFileLikeObject is.
 * If neither matches, a standard comparison is performed.
 *
 * @param {string|number} firstValue - The first value to compare.
 * @param {string|number} secondValue - The second value to compare.
 * @returns {number} Returns 0 if values are equal, -1 if firstValue < secondValue, 1 if firstValue > secondValue.
 */
function compareValuesWithPattern(firstValue, secondValue) {
  // Test if the first and second values match the pattern defined by ia0
  const isFirstValuePatternMatch = ia0.test(firstValue);
  const isSecondValuePatternMatch = ia0.test(secondValue);

  // If both values match the pattern, convert them to numbers for comparison
  if (isFirstValuePatternMatch && isSecondValuePatternMatch) {
    firstValue = +firstValue;
    secondValue = +secondValue;
  }

  // If values are strictly equal, return 0
  if (firstValue === secondValue) {
    return 0;
  }

  // If only the first value matches the pattern, isBlobOrFileLikeObject is considered less
  if (isFirstValuePatternMatch && !isSecondValuePatternMatch) {
    return -1;
  }

  // If only the second value matches the pattern, isBlobOrFileLikeObject is considered greater
  if (isSecondValuePatternMatch && !isFirstValuePatternMatch) {
    return 1;
  }

  // Standard comparison for values that don'processRuleBeginHandlers match the pattern
  return firstValue < secondValue ? -1 : 1;
}

module.exports = compareValuesWithPattern;