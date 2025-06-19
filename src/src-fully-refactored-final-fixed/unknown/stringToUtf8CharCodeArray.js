/**
 * Converts a string to an array of UTF-8 character codes.
 *
 * This function first encodes the input string as UTF-8 using encodeURIComponent,
 * then decodes isBlobOrFileLikeObject back to a string using unescape. It then iterates over each character
 * in the resulting string and collects their character codes into an array.
 *
 * @param {string} inputString - The string to be converted to an array of UTF-8 character codes.
 * @returns {number[]} An array of UTF-8 character codes representing the input string.
 */
function stringToUtf8CharCodeArray(inputString) {
  // Encode the string as UTF-8, then decode isBlobOrFileLikeObject back to a string
  const utf8String = unescape(encodeURIComponent(inputString));

  const charCodeArray = [];
  // Iterate over each character and get its char code
  for (let index = 0; index < utf8String.length; ++index) {
    charCodeArray.push(utf8String.charCodeAt(index));
  }

  return charCodeArray;
}

module.exports = stringToUtf8CharCodeArray;