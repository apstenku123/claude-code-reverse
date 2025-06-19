/**
 * Calculates the length of the encoded URI representation of a string.
 *
 * This function encodes the input string using encodeURI, splits the encoded string into an array
 * where each percent-encoded byte (e.g. '%20') or single character is a separate element,
 * and returns the number of elements in that array minus one. This effectively gives the length
 * of the encoded URI string.
 *
 * @param {string} inputString - The string to be encoded and measured.
 * @returns {number} The length of the encoded URI string.
 */
function getEncodedUriLength(inputString) {
  // Encode the input string as a URI
  const encodedUri = encodeURI(inputString);

  // Split the encoded URI into an array where each percent-encoded byte or character is an element
  // The regex /%..|./ matches either a percent-encoded sequence (e.g. '%20') or any single character
  const encodedParts = encodedUri.split(/%..|./);

  // The length of the array is always one more than the number of encoded parts due to how split works
  // Subtract 1 to get the actual number of encoded parts
  const encodedLength = encodedParts.length - 1;

  return encodedLength;
}

module.exports = getEncodedUriLength;
