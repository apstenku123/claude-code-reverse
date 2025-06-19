/**
 * Processes a single input code and updates the parser state and output buffer accordingly.
 * Handles special cases for hyphen, less-than, null, and end-of-input codes.
 *
 * @param {number} inputCode - The code point to process (e.g., character code or special sentinel value).
 */
function processInputCode(inputCode) {
  switch (inputCode) {
    case 45: // Hyphen-minus '-'
      parserState = handleHyphenCode;
      outputBuffer.push(45);
      break;
    case 60: // Less-than sign '<'
      parserState = handleLessThanCode;
      outputBuffer.push(60);
      break;
    case 0: // Null character
      outputBuffer.push(65533); // Unicode replacement character
      break;
    case -1: // End of input
      handleEndOfInput();
      break;
    default:
      outputBuffer.push(inputCode);
      break;
  }
}

module.exports = processInputCode;