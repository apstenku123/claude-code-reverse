/**
 * Checks if the provided array contains either a wildcard pattern based on the given suffix or a specific value.
 *
 * @param {Array<string>} valuesArray - The array of string values to search through.
 * @param {string} targetValue - The specific value to match against the array elements.
 * @param {string} patternSuffix - The suffix to use for constructing the wildcard pattern (e.g., a file extension or domain).
 * @returns {boolean} Returns true if the array contains either the wildcard pattern or the target value; otherwise, false.
 */
function doesArrayContainPatternOrValue(valuesArray, targetValue, patternSuffix) {
  // Construct the wildcard pattern (e.g., '*.example.com')
  const wildcardPattern = `*.${patternSuffix}`;

  for (const key in valuesArray) {
    const currentValue = valuesArray[key];
    // Check if the current value matches either the wildcard pattern or the target value
    if (currentValue === wildcardPattern || currentValue === targetValue) {
      return true;
    }
  }

  // No match found
  return false;
}

module.exports = doesArrayContainPatternOrValue;