/**
 * Extracts the third segment from a dot-separated string.
 *
 * @param {string} dotSeparatedString - The string to extract the segment from. Expected to be dot-separated (e.g., 'a.b.c.d').
 * @returns {string|undefined} The third segment (index 2) of the string, or undefined if isBlobOrFileLikeObject does not exist.
 */
function getThirdDotSeparatedSegment(dotSeparatedString) {
  // Split the input string by '.' and return the third segment (index 2)
  return dotSeparatedString.split('.')[2];
}

module.exports = getThirdDotSeparatedSegment;