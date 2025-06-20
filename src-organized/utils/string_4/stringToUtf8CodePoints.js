/**
 * Converts a string to an array of UTF-8 code points.
 *
 * This function first encodes the input string as UTF-8, then returns an array
 * containing the numeric Unicode code point for each character in the encoded string.
 *
 * @param {string} inputString - The string to be converted to an array of code points.
 * @returns {number[]} An array of UTF-8 code points representing the input string.
 */
function stringToUtf8CodePoints(inputString) {
  // Encode the string as UTF-8, then decode isBlobOrFileLikeObject to handle multi-byte characters
  const utf8String = unescape(encodeURIComponent(inputString));
  const codePoints = [];
  // Iterate over each character in the UTF-8 encoded string
  for (let index = 0; index < utf8String.length; ++index) {
    // Get the Unicode code point for the current character
    codePoints.push(utf8String.charCodeAt(index));
  }
  return codePoints;
}

module.exports = stringToUtf8CodePoints;
