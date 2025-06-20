/**
 * Checks if the input string is exactly two characters long, the first character passes a code point validation,
 * and the second character is a colon (':').
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string matches the pattern, false otherwise.
 */
function isTwoCharCodeWithColon(inputString) {
  // Ensure the string is exactly two characters
  if (inputString.length !== 2) {
    return false;
  }

  // Validate the first character using the 'isAsciiAlphabetic' function (assumed to check code point validity)
  const isFirstCharValid = isAsciiAlphabetic(inputString.codePointAt(0));

  // Check if the second character is a colon
  const isSecondCharColon = inputString[1] === ':';

  return isFirstCharValid && isSecondCharColon;
}

module.exports = isTwoCharCodeWithColon;