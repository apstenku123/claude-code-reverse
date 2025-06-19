/**
 * Handles actions based on a given character code, typically used in parsing or tokenizing input streams.
 *
 * @param {number} characterCode - The ASCII code of the character to handle.
 * @returns {void}
 *
 * This function updates the parser state and invokes side-effect functions depending on the character code provided.
 */
function oO(characterCode) {
  switch (characterCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      parserState = whitespaceState;
      break;
    case 34:  // Double Quote (")
      resetAttributeBuffer();
      parserState = doubleQuoteAttributeState;
      break;
    case 39:  // Single Quote (')
      resetAttributeBuffer();
      parserState = singleQuoteAttributeState;
      break;
    case 62:  // Greater Than Sign ('>')
      finalizeAttribute();
      parserState = dataState;
      emitToken();
      break;
    case -1:  // End of input
      finalizeAttribute();
      emitToken();
      endOfFile();
      break;
    default:
      finalizeAttribute();
      parserState = unquotedAttributeValueState;
      break;
  }
}

module.exports = oO;