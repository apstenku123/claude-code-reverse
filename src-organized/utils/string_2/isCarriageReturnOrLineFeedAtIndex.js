/**
 * Checks if the character at the specified index in the input string is a carriage return (\r) or line feed (\n).
 *
 * @param {string} inputString - The string to check.
 * @param {number} index - The position in the string to examine.
 * @returns {boolean} True if the character at the given index is '\r' or '\n', otherwise false.
 */
function isCarriageReturnOrLineFeedAtIndex(inputString, index) {
  // Get the character at the specified index
  const characterAtIndex = inputString.charAt(index);
  // Check if the character is either '\r' or '\n'
  return '\r\n'.indexOf(characterAtIndex) !== -1;
}

module.exports = isCarriageReturnOrLineFeedAtIndex;