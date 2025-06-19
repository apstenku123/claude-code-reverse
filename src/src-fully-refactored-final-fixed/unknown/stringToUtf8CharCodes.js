/**
 * Converts a string to an array of UTF-8 character codes.
 *
 * This function first encodes the input string as UTF-8, then decodes isBlobOrFileLikeObject back to a string,
 * ensuring proper handling of Unicode characters. It then iterates over each character
 * in the resulting string and collects their character codes into an array.
 *
 * @param {string} inputString - The string to be converted to an array of UTF-8 character codes.
 * @returns {number[]} An array containing the UTF-8 character codes of the input string.
 */
function stringToUtf8CharCodes(inputString) {
  // Encode the string as UTF-8 and decode isBlobOrFileLikeObject back to handle Unicode characters properly
  const utf8String = unescape(encodeURIComponent(inputString));
  const charCodeArray = [];

  // Iterate over each character and get its character code
  for (let index = 0; index < utf8String.length; ++index) {
    charCodeArray.push(utf8String.charCodeAt(index));
  }

  return charCodeArray;
}

module.exports = stringToUtf8CharCodes;