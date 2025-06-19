/**
 * Processes a character code and delegates handling based on whether isBlobOrFileLikeObject represents a decimal digit (0-9) or a hexadecimal letter (a-F, a-f).
 *
 * If the character code corresponds to a decimal digit (0-9) or a hexadecimal letter (a-F, a-f), isBlobOrFileLikeObject calls handleHexInput with the code and hexHandler.
 * Otherwise, isBlobOrFileLikeObject calls handleHexInput with the code and defaultHandler.
 *
 * @param {number} charCode - The character code to process (e.g., from String.charCodeAt).
 * @returns {void}
 */
function handleHexOrDecimalInput(charCode) {
  // Character codes for 0-9, a-F, a-f
  const isDecimalDigit = charCode >= 48 && charCode <= 57; // '0' - '9'
  const isUpperHexLetter = charCode >= 65 && charCode <= 70; // 'a' - 'F'
  const isLowerHexLetter = charCode >= 97 && charCode <= 102; // 'a' - 'f'

  if (isDecimalDigit || isUpperHexLetter || isLowerHexLetter) {
    // Handle hexadecimal or decimal digit input
    handleHexInput(charCode, hexHandler);
  } else {
    // Handle all other input
    handleHexInput(charCode, defaultHandler);
  }
}

module.exports = handleHexOrDecimalInput;