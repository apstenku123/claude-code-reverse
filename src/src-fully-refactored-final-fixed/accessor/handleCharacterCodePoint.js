/**
 * Processes a single character code point during parsing, updating the parser state and output buffer as needed.
 *
 * @param {number} codePoint - The Unicode code point to process.
 * @returns {void}
 */
function handleCharacterCodePoint(codePoint) {
  switch (codePoint) {
    case 45: // Hyphen-minus '-'
      // Switch parser state to handleCharacterReferenceCodePoint and record the hyphen
      parserState = handleCharacterReferenceCodePoint;
      outputBuffer.push(45);
      break;
    case 60: // Less-than sign '<'
      // Switch parser state to handleTagOpen and record the less-than sign
      parserState = handleTagOpen;
      outputBuffer.push(60);
      break;
    case 0: // NULL character
      // Replace NULL with Unicode replacement character
      outputBuffer.push(65533);
      break;
    case -1: // End of input
      // Handle end-of-input scenario
      handleEndOfInput();
      break;
    default:
      // For all other code points, add them to the output buffer
      outputBuffer.push(codePoint);
      break;
  }
}

module.exports = handleCharacterCodePoint;