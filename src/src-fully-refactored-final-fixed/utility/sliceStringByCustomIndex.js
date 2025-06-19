/**
 * Returns a substring of the input string, sliced from the start up to a custom index determined by getKmpPartialMatchLength.
 *
 * @param {string} sourceString - The reference string used by getKmpPartialMatchLength to determine the slice index.
 * @param {string} targetString - The string to be sliced.
 * @returns {string} The substring of targetString from index 0 up to the index returned by getKmpPartialMatchLength.
 */
function sliceStringByCustomIndex(sourceString, targetString) {
  // Determine the slice end index using the external getKmpPartialMatchLength function
  const sliceEndIndex = getKmpPartialMatchLength(sourceString, targetString);
  // Return the substring from the start up to the computed index
  return targetString.slice(0, sliceEndIndex);
}

module.exports = sliceStringByCustomIndex;