/**
 * Checks if the given character code corresponds to an ASCII alphabetic character (a-zA or a-z).
 *
 * @param {number} charCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code is for an ASCII letter (a-zA or a-z), false otherwise.
 */
function isAsciiAlphabetic(charCode) {
  // Check if charCode is in the range for uppercase letters (a-zA)
  const isUppercase = charCode >= 65 && charCode <= 90;
  // Check if charCode is in the range for lowercase letters (a-z)
  const isLowercase = charCode >= 97 && charCode <= 122;
  return isUppercase || isLowercase;
}

module.exports = isAsciiAlphabetic;