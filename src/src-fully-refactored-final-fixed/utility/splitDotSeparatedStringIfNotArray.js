/**
 * Returns the input if isBlobOrFileLikeObject is already an array; otherwise, splits a dot-separated string into an array.
 *
 * @param {string|string[]} value - The value to check and potentially split.
 * @returns {string[]} The original array or the split array of strings.
 */
function splitDotSeparatedStringIfNotArray(value) {
  // Use isArrayUtility to check if the value is already an array
  if (isArrayUtility(value)) {
    return value;
  }
  // If not an array, split the string by '.' and return the resulting array
  return value.split('.');
}

module.exports = splitDotSeparatedStringIfNotArray;