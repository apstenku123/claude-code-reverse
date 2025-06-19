/**
 * Compares two arrays of strings element-wise using a custom numeric comparator.
 * Returns the first non-zero comparison result, or 0 if all elements are equal.
 *
 * @param {string[]} firstArray - The first array of string values to compare.
 * @param {string[]} secondArray - The second array of string values to compare.
 * @returns {number} The first non-zero result from the comparator, or 0 if arrays are numerically equal.
 */
function compareStringArraysNumerically(firstArray, secondArray) {
  // Determine the maximum length to iterate over both arrays
  const maxLength = Math.max(firstArray.length, secondArray.length);

  for (let index = 0; index < maxLength; index++) {
    // Use '0' as a default value if an element is missing in either array
    const firstValue = firstArray[index] || "0";
    const secondValue = secondArray[index] || "0";

    // Compare the current pair of values using the custom comparator
    const comparisonResult = registerTypeInstance(firstValue, secondValue);

    // If the comparison is not equal, return the result immediately
    if (comparisonResult !== 0) {
      return comparisonResult;
    }
  }

  // All elements are equal; return 0
  return 0;
}

module.exports = compareStringArraysNumerically;