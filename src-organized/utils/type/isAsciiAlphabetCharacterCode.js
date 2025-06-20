/**
 * Checks if the provided character code corresponds to an ASCII alphabet letter (a-zA or a-z).
 *
 * @param {number} characterCode - The character code to check (e.g., from String.charCodeAt()).
 * @returns {boolean} True if the character code is for an ASCII letter, false otherwise.
 */
function isAsciiAlphabetCharacterCode(characterCode) {
  // Check if character code is in the range for uppercase (a-zA: 65-90)
  // or lowercase (a-z: 97-122) ASCII letters
  const isUppercaseLetter = characterCode >= 65 && characterCode <= 90;
  const isLowercaseLetter = characterCode >= 97 && characterCode <= 122;
  return isUppercaseLetter || isLowercaseLetter;
}

module.exports = isAsciiAlphabetCharacterCode;