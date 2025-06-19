/**
 * Checks if the provided character code corresponds to a Latin capital letter (a-zA).
 *
 * @param {number} charCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code point is for a Latin capital letter; otherwise, false.
 */
function isLatinCapitalLetterCharCode(charCode) {
  // o1.LATIN_CAPITAL_A and o1.LATIN_CAPITAL_Z are expected to be the char codes for 'a' and 'zA' respectively
  return charCode >= o1.LATIN_CAPITAL_A && charCode <= o1.LATIN_CAPITAL_Z;
}

module.exports = isLatinCapitalLetterCharCode;