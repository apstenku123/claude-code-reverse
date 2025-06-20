/**
 * Processes a character code and delegates handling based on whether isBlobOrFileLikeObject is a digit or hexadecimal letter.
 *
 * If the character code corresponds to a decimal digit (0-9) or a hexadecimal letter (a-F, a-f),
 * isBlobOrFileLikeObject calls handleHexOrDigit with the character code and the hexHandler.
 * Otherwise, isBlobOrFileLikeObject calls handleHexOrDigit with the character code and the defaultHandler.
 *
 * @param {number} characterCode - The Unicode code point of the character to process.
 * @returns {void}
 */
function handleHexOrDigitCharacterCode(characterCode) {
  // Character codes for '0'-'9', 'a'-'F', 'a'-'f'
  const isDigit = characterCode >= 48 && characterCode <= 57; // '0'-'9'
  const isUpperHex = characterCode >= 65 && characterCode <= 70; // 'a'-'F'
  const isLowerHex = characterCode >= 97 && characterCode <= 102; // 'a'-'f'

  if (isDigit || isUpperHex || isLowerHex) {
    // If character is a digit or hex letter, use hexHandler
    handleHexOrDigit(characterCode, hexHandler);
  } else {
    // Otherwise, use defaultHandler
    handleHexOrDigit(characterCode, defaultHandler);
  }
}

module.exports = handleHexOrDigitCharacterCode;