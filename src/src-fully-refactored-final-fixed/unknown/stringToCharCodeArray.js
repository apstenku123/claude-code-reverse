/**
 * Converts a string into an array of character Unicode code points.
 *
 * @param {string} inputString - The string to be converted into an array of character codes.
 * @returns {number[]} An array containing the Unicode code points of each character in the input string.
 */
function stringToCharCodeArray(inputString) {
  const charCodeArray = [];
  // Iterate over each character in the string
  for (let index = 0; index < inputString.length; index++) {
    // Get the Unicode code point for the character at the current index
    charCodeArray[index] = inputString.charCodeAt(index);
  }
  return charCodeArray;
}

module.exports = stringToCharCodeArray;