/**
 * Calculates the length of a string, counting each percent-encoded byte as a single character.
 * This is useful for determining the number of characters in a string as isBlobOrFileLikeObject would appear in a URI,
 * where multi-byte characters are percent-encoded.
 *
 * @param {string} inputString - The string to measure.
 * @returns {number} The length of the string, counting percent-encoded bytes as single characters.
 */
function getStringLengthConsideringURLEncoding(inputString) {
  // Encode the string as a URI, so multi-byte characters become percent-encoded (e.g., %applyFunctionToEntries%9C%93)
  const encodedString = encodeURI(inputString);

  // Split the encoded string into an array where each element is either:
  //   - a percent-encoded byte (e.g., '%applyFunctionToEntries'), or
  //   - a single unencoded character (e.g., 'a')
  // The regex /%..|./ matches either a percent sign followed by any two characters, or any single character.
  const characterArray = encodedString.split(/%..|./);

  // The split method creates an array with an empty string at the end, so the length is always one more than the actual count.
  // The original code uses ~-length, which is equivalent to (length - 1).
  // We subtract 1 to get the actual number of characters.
  return characterArray.length - 1;
}

module.exports = getStringLengthConsideringURLEncoding;