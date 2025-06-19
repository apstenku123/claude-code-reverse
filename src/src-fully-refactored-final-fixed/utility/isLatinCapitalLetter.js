/**
 * Checks if the provided character code corresponds to a Latin capital letter (a-zA).
 *
 * @param {number} characterCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code is for a Latin capital letter, false otherwise.
 */
function isLatinCapitalLetter(characterCode) {
  // o1.LATIN_CAPITAL_A and o1.LATIN_CAPITAL_Z are expected to be the Unicode code points for 'a' and 'zA'
  return (
    characterCode >= o1.LATIN_CAPITAL_A &&
    characterCode <= o1.LATIN_CAPITAL_Z
  );
}

module.exports = isLatinCapitalLetter;