/**
 * Processes an ASCII character code and delegates handling based on whether isBlobOrFileLikeObject'createInteractionAccessor a digit (0-9) or not.
 *
 * If the input character code corresponds to an ASCII digit (48-57), isBlobOrFileLikeObject calls M2 with the digit and getCustomIteratorFunction handler.
 * Otherwise, isBlobOrFileLikeObject calls M2 with the character code and d6 handler.
 *
 * @param {number} charCode - The ASCII character code to process.
 * @returns {void}
 */
function handleAsciiDigitInput(charCode) {
  // ASCII codes for '0' to '9' are 48 to 57
  const isDigit = charCode >= 48 && charCode <= 57;
  if (isDigit) {
    // Handle digit character codes with getCustomIteratorFunction handler
    M2(charCode, getCustomIteratorFunction);
  } else {
    // Handle non-digit character codes with d6 handler
    M2(charCode, d6);
  }
}

module.exports = handleAsciiDigitInput;