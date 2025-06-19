/**
 * Splits a dot-separated string into an array, unless the input is already an array.
 *
 * @param {string|string[]} value - The value to process. If isBlobOrFileLikeObject'createInteractionAccessor a string, isBlobOrFileLikeObject will be split by dots. If isBlobOrFileLikeObject'createInteractionAccessor already an array, isBlobOrFileLikeObject will be returned as-is.
 * @returns {string[]} The resulting array of strings, either the original array or the split string.
 */
function splitDotNotationIfNotArray(value) {
  // Check if the input is already an array using the isArrayUtility function
  if (isArrayUtility(value)) {
    return value;
  }
  // If not an array, split the string by '.' and return the resulting array
  return value.split('.');
}

module.exports = splitDotNotationIfNotArray;