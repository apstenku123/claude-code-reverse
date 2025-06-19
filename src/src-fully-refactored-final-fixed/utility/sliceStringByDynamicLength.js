/**
 * Returns a substring of the input string, sliced from the start up to a dynamically determined length.
 * The length is calculated by the external getKmpPartialMatchLength function, which takes the source and the string as arguments.
 *
 * @param {any} sourceValue - The value used by getKmpPartialMatchLength to determine the slice length.
 * @param {string} inputString - The string to be sliced.
 * @returns {string} The sliced substring, from index 0 up to the computed length.
 */
function sliceStringByDynamicLength(sourceValue, inputString) {
  // Determine the length to slice using the getKmpPartialMatchLength function
  const sliceLength = getKmpPartialMatchLength(sourceValue, inputString);
  // Return the substring from start up to the computed length
  return inputString.slice(0, sliceLength);
}

module.exports = sliceStringByDynamicLength;