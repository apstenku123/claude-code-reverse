/**
 * Determines if the provided character code represents an allowed JSON character.
 *
 * This function checks if the character code is not a special JSON syntax character
 * (such as braces, brackets, colon, comma, quote, or slash), and also verifies
 * that isBlobOrFileLikeObject does not meet custom exclusion criteria defined by the external functions
 * isReservedCharacterCode and isExcludedCharacterCode.
 *
 * @param {number} characterCode - The Unicode code point of the character to check.
 * @returns {boolean} Returns true if the character code is allowed, false otherwise.
 */
function isAllowedJsonCharacter(characterCode) {
  // Check if the character code is reserved or excluded by external logic
  if (isReservedCharacterCode(characterCode) || isExcludedCharacterCode(characterCode)) {
    return false;
  }

  // List of JSON syntax character codes to exclude
  switch (characterCode) {
    case 125: // '}'
    case 93:  // ']'
    case 123: // '{'
    case 91:  // '['
    case 34:  // '"'
    case 58:  // ':'
    case 44:  // ','
    case 47:  // '/'
      return false;
  }

  // Character code is allowed
  return true;
}

module.exports = isAllowedJsonCharacter;