/**
 * Checks if the character at the specified index in the input string is a carriage return (\r) or line feed (\n).
 *
 * @param {string} inputString - The string to check.
 * @param {number} charIndex - The index of the character to check within the string.
 * @returns {boolean} True if the character is a carriage return or line feed, false otherwise.
 */
function isCharCarriageReturnOrLineFeed(inputString, charIndex) {
  // Get the character at the specified index
  const character = inputString.charAt(charIndex);
  // Check if the character is either '\r' or '\n'
  return '\r\n'.indexOf(character) !== -1;
}

module.exports = isCharCarriageReturnOrLineFeed;
