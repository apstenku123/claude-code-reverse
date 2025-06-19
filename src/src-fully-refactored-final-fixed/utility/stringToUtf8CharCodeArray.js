/**
 * Converts a string into an array of UTF-8 character codes.
 *
 * This function first encodes the input string as UTF-8, then returns an array
 * containing the Unicode code points (char codes) for each character in the encoded string.
 *
 * @param {string} inputString - The string to convert to an array of UTF-8 char codes.
 * @returns {number[]} An array of numbers representing the UTF-8 char codes of the input string.
 */
function stringToUtf8CharCodeArray(inputString) {
  // Encode the string as UTF-8, then decode to get the correct character representation
  const utf8String = unescape(encodeURIComponent(inputString));
  const charCodeArray = [];

  // Iterate over each character and get its char code
  for (let index = 0; index < utf8String.length; ++index) {
    charCodeArray.push(utf8String.charCodeAt(index));
  }

  return charCodeArray;
}

module.exports = stringToUtf8CharCodeArray;