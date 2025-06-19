/**
 * Processes an input character code, updates the parser state, and manages the character buffer based on the input.
 * Handles special cases for hyphen, less-than, null, and end-of-input.
 *
 * @param {number} characterCode - The Unicode code point of the input character to process.
 */
function handleInputCharacterCode(characterCode) {
  switch (characterCode) {
    case 45: // Hyphen-minus '-'
      parserState = handleHyphenState;
      characterBuffer.push(45);
      break;
    case 60: // Less-than sign '<'
      parserState = handleLessThanState;
      characterBuffer.push(60);
      break;
    case 0: // Null character
      // Replace null character with Unicode replacement character
      characterBuffer.push(65533);
      break;
    case -1: // End of input
      handleEndOfInput();
      break;
    default:
      // For all other characters, push the code as-is
      characterBuffer.push(characterCode);
      break;
  }
}

module.exports = handleInputCharacterCode;