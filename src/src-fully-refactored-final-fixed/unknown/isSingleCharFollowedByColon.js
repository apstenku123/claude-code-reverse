/**
 * Checks if the input string is exactly two characters long, the first character passes a custom validation,
 * and the second character is a colon (':').
 *
 * @param {string} input - The string to validate.
 * @returns {boolean} True if the string matches the pattern, false otherwise.
 */
function isSingleCharFollowedByColon(input) {
  // Ensure the input is exactly two characters long
  if (input.length !== 2) {
    return false;
  }

  // Validate the first character using the external 'isAsciiAlphabetic' function
  // and check if the second character is a colon
  return isAsciiAlphabetic(input.codePointAt(0)) && input[1] === ':';
}

module.exports = isSingleCharFollowedByColon;