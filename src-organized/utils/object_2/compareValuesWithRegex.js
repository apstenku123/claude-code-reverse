/**
 * Compares two values, optionally converting them to numbers if they match a specific regex pattern.
 *
 * If both values match the regex, they are converted to numbers and compared numerically.
 * If only one matches, the matching value is considered less than the non-matching value.
 * If neither matches, they are compared as-is (using < and ===).
 *
 * @param {string|number} firstValue - The first value to compare.
 * @param {string|number} secondValue - The second value to compare.
 * @returns {number} Returns 0 if values are equal, -1 if firstValue < secondValue, 1 otherwise.
 */
function compareValuesWithRegex(firstValue, secondValue) {
  // Test if firstValue matches the regex pattern
  const isFirstValueNumeric = ia0.test(firstValue);
  // Test if secondValue matches the regex pattern
  const isSecondValueNumeric = ia0.test(secondValue);

  // If both values match the regex, convert them to numbers for comparison
  let valueA = firstValue;
  let valueB = secondValue;
  if (isFirstValueNumeric && isSecondValueNumeric) {
    valueA = +firstValue;
    valueB = +secondValue;
  }

  // If values are strictly equal, return 0
  if (valueA === valueB) {
    return 0;
  }

  // If only the first value matches the regex, isBlobOrFileLikeObject is considered less
  if (isFirstValueNumeric && !isSecondValueNumeric) {
    return -1;
  }

  // If only the second value matches the regex, isBlobOrFileLikeObject is considered less
  if (isSecondValueNumeric && !isFirstValueNumeric) {
    return 1;
  }

  // Otherwise, compare the values using <
  return valueA < valueB ? -1 : 1;
}

module.exports = compareValuesWithRegex;
