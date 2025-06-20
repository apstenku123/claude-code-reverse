/**
 * Processes an ASCII code and delegates handling based on whether isBlobOrFileLikeObject is a digit (0-9) or not.
 *
 * If the input ASCII code corresponds to a digit character ('0'-'9'), isBlobOrFileLikeObject calls the handler for digits.
 * Otherwise, isBlobOrFileLikeObject calls the handler for non-digit characters.
 *
 * @param {number} asciiCode - The ASCII code of the character to process.
 * @returns {void}
 */
function processAsciiDigitOrOther(asciiCode) {
  // ASCII codes for '0' to '9' are 48 to 57
  switch (asciiCode) {
    case 48: // '0'
    case 49: // '1'
    case 50: // '2'
    case 51: // '3'
    case 52: // '4'
    case 53: // '5'
    case 54: // '6'
    case 55: // '7'
    case 56: // '8'
    case 57: // '9'
      // Handle digit character
      M2(asciiCode, getCustomIteratorFunction);
      break;
    default:
      // Handle non-digit character
      M2(asciiCode, d6);
      break;
  }
}

module.exports = processAsciiDigitOrOther;