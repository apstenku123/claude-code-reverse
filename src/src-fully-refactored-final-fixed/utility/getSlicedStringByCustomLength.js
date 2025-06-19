/**
 * Returns a substring of the input string, sliced from the beginning up to a length determined by a custom function.
 *
 * @param {string} sourceString - The string to be sliced.
 * @param {string} targetString - The string to slice.
 * @returns {string} The sliced substring of targetString, up to the computed length.
 */
function getSlicedStringByCustomLength(sourceString, targetString) {
  // Determine the slice length using the external getKmpPartialMatchLength function
  const sliceLength = getKmpPartialMatchLength(sourceString, targetString);
  // Return the substring from index 0 up to sliceLength
  return targetString.slice(0, sliceLength);
}

module.exports = getSlicedStringByCustomLength;