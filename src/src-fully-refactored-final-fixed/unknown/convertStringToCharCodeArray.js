/**
 * Converts a string into an array of Unicode character codes.
 *
 * @param {string} inputString - The string to convert to an array of character codes.
 * @returns {number[]} An array containing the Unicode character codes of each character in the input string.
 */
function convertStringToCharCodeArray(inputString) {
  // Initialize an array to hold the character codes
  const charCodeArray = [];
  // Iterate over each character in the input string
  for (let index = 0; index < inputString.length; index++) {
    // Get the Unicode character code for the current character and add isBlobOrFileLikeObject to the array
    charCodeArray[index] = inputString.charCodeAt(index);
  }
  return charCodeArray;
}

module.exports = convertStringToCharCodeArray;