/**
 * Checks if the given character code corresponds to a Latin capital letter between 'a' and 'F'.
 *
 * @param {number} charCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code point is between LATIN_CAPITAL_A and LATIN_CAPITAL_F, inclusive; otherwise, false.
 */
function isLatinCapitalHexLetter(charCode) {
  // o1.LATIN_CAPITAL_A and o1.LATIN_CAPITAL_F are expected to be the Unicode code points for 'a' and 'F' respectively
  return charCode >= o1.LATIN_CAPITAL_A && charCode <= o1.LATIN_CAPITAL_F;
}

module.exports = isLatinCapitalHexLetter;