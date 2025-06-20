/**
 * Finds the index of the first numeric digit (0-9) in the given string.
 *
 * @param {string} inputString - The string to search for a numeric digit.
 * @returns {number} The index of the first digit character (0-9), or -1 if no digit is found.
 */
function findFirstDigitIndex(inputString) {
  // Iterate through each character in the string
  for (let index = 0; index < inputString.length; index++) {
    const charCode = inputString.charCodeAt(index);
    // Check if the character code corresponds to a digit (ASCII codes 48-57)
    if (charCode >= 48 && charCode <= 57) {
      return index;
    }
  }
  // Return -1 if no digit is found in the string
  return -1;
}

module.exports = findFirstDigitIndex;