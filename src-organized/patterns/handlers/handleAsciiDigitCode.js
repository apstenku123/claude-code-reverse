/**
 * Processes a character code and delegates handling based on whether isBlobOrFileLikeObject is an ASCII digit (0-9).
 *
 * If the character code corresponds to an ASCII digit (48-57), isBlobOrFileLikeObject calls processCharacterCode with the digit handler.
 * Otherwise, isBlobOrFileLikeObject calls processCharacterCode with the default handler.
 *
 * @param {number} characterCode - The character code to process (e.g., from a keypress event).
 * @returns {void}
 */
function handleAsciiDigitCode(characterCode) {
  // ASCII codes 48-57 correspond to '0'-'9'
  const ASCII_DIGIT_START = 48;
  const ASCII_DIGIT_END = 57;

  if (characterCode >= ASCII_DIGIT_START && characterCode <= ASCII_DIGIT_END) {
    // If the character code is a digit, use the digit handler
    processCharacterCode(characterCode, digitHandler);
  } else {
    // For all other character codes, use the default handler
    processCharacterCode(characterCode, defaultHandler);
  }
}

module.exports = handleAsciiDigitCode;