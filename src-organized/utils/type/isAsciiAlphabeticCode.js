/**
 * Checks if the provided character code corresponds to an ASCII alphabetic letter (a-zA or a-z).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the code is for an ASCII letter, false otherwise.
 */
function isAsciiAlphabeticCode(charCode) {
  // Check if charCode is between 65 ('a') and 90 ('zA'), or between 97 ('a') and 122 ('z')
  const isUppercase = charCode >= 65 && charCode <= 90;
  const isLowercase = charCode >= 97 && charCode <= 122;
  return isUppercase || isLowercase;
}

module.exports = isAsciiAlphabeticCode;