/**
 * Checks if the given character code corresponds to a lowercase hexadecimal letter (a-f).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is between 'a' and 'f' (inclusive), false otherwise.
 */
function isLatinLowercaseHexLetter(charCode) {
  // o1.LATIN_SMALL_A and o1.LATIN_SMALL_F are expected to be the char codes for 'a' and 'f'
  return charCode >= o1.LATIN_SMALL_A && charCode <= o1.LATIN_SMALL_F;
}

module.exports = isLatinLowercaseHexLetter;