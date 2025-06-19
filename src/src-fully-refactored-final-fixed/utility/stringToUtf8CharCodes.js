/**
 * Converts a string to an array of UTF-8 character codes.
 *
 * This function first encodes the input string as UTF-8, then returns an array
 * containing the numeric character codes for each character in the encoded string.
 *
 * @param {string} inputString - The string to convert to UTF-8 character codes.
 * @returns {number[]} An array of UTF-8 character codes representing the input string.
 */
function stringToUtf8CharCodes(inputString) {
  // Encode the string as UTF-8, then decode to get the correct character representation
  const utf8String = unescape(encodeURIComponent(inputString));
  const charCodeArray = [];

  // Iterate over each character in the UTF-8 encoded string
  for (let index = 0; index < utf8String.length; ++index) {
    // Push the character code of each character to the array
    charCodeArray.push(utf8String.charCodeAt(index));
  }

  return charCodeArray;
}

module.exports = stringToUtf8CharCodes;
