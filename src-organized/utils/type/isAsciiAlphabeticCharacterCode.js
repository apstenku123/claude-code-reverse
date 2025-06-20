/**
 * Checks if the provided character code corresponds to an ASCII alphabetic letter (a-zA or a-z).
 *
 * @param {number} characterCode - The character code to check (e.g., from String.charCodeAt()).
 * @returns {boolean} True if the character code is for an ASCII letter, false otherwise.
 */
function isAsciiAlphabeticCharacterCode(characterCode) {
  // Check if character code is in the range for uppercase letters (a-zA)
  const isUppercase = characterCode >= 65 && characterCode <= 90;
  // Check if character code is in the range for lowercase letters (a-z)
  const isLowercase = characterCode >= 97 && characterCode <= 122;
  // Return true if either condition is met
  return isUppercase || isLowercase;
}

module.exports = isAsciiAlphabeticCharacterCode;