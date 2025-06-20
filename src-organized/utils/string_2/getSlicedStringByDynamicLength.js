/**
 * Returns a substring of the input string, sliced from the beginning up to a dynamically determined length.
 * The length is calculated by the external getKmpPartialMatchLength function, which takes the source and the string to slice as arguments.
 *
 * @param {string} sourceString - The source string used to determine the slice length.
 * @param {string} targetString - The string to be sliced.
 * @returns {string} The sliced portion of the target string, from index 0 up to the computed length.
 */
function getSlicedStringByDynamicLength(sourceString, targetString) {
  // Determine the slice length using the external getKmpPartialMatchLength function
  const sliceLength = getKmpPartialMatchLength(sourceString, targetString);
  // Return the substring from the beginning up to the computed length
  return targetString.slice(0, sliceLength);
}

module.exports = getSlicedStringByDynamicLength;