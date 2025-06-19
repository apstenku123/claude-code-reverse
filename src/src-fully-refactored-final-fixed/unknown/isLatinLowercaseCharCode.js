/**
 * Checks if the provided character code corresponds to a lowercase Latin letter (a-z).
 *
 * @param {number} charCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code is for a lowercase Latin letter, false otherwise.
 */
function isLatinLowercaseCharCode(charCode) {
  // o1.LATIN_SMALL_A and o1.LATIN_SMALL_Z are expected to be the char codes for 'a' and 'z'
  return charCode >= o1.LATIN_SMALL_A && charCode <= o1.LATIN_SMALL_Z;
}

module.exports = isLatinLowercaseCharCode;