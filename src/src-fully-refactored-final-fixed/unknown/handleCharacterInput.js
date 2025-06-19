/**
 * Handles character input codes and updates the parser state accordingly.
 *
 * This function processes a character code (such as whitespace, quotes, or special characters)
 * and updates the parser'createInteractionAccessor state machine by setting the current state variable or calling
 * relevant handler functions. It is typically used in a parser or lexer to manage transitions
 * between parsing states based on the input character.
 *
 * @param {number} characterCode - The Unicode code point of the input character to process.
 * @returns {void}
 */
function handleCharacterInput(characterCode) {
  switch (characterCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      parserState = STATE_BEFORE_ATTRIBUTE_NAME;
      break;
    // Greater-than sign '>'
    case 62:
      parserState = STATE_DATA;
      insertTextAtCursor();
      break;
    // Double quote '"'
    case 34:
      handleAttributeValueStart();
      parserState = STATE_ATTRIBUTE_VALUE_DOUBLE_QUOTED;
      break;
    // Single quote '\''
    case 39:
      handleAttributeValueStart();
      parserState = STATE_ATTRIBUTE_VALUE_SINGLE_QUOTED;
      break;
    // End of input
    case -1:
      handleAttributeValueEnd();
      insertTextAtCursor();
      finalizeParsing();
      break;
    // Any other character
    default:
      handleAttributeValueEnd();
      parserState = STATE_ATTRIBUTE_VALUE_UNQUOTED;
      break;
  }
}

module.exports = handleCharacterInput;