/**
 * Returns a substring of the input string up to a computed index.
 * The index is determined by the external getKmpPartialMatchLength function, which takes the source and the string as arguments.
 *
 * @param {string} sourceString - The source string used to determine the slice index.
 * @param {string} targetString - The string to be sliced.
 * @returns {string} Substring of targetString from index 0 up to the computed index.
 */
function sliceStringUpToIndex(sourceString, targetString) {
  // Compute the index up to which to slice the string using getKmpPartialMatchLength
  const sliceIndex = getKmpPartialMatchLength(sourceString, targetString);
  // Return the substring from the start up to the computed index
  return targetString.slice(0, sliceIndex);
}

module.exports = sliceStringUpToIndex;