/**
 * Handles character input codes and updates the parser state accordingly.
 *
 * This function processes a character code (such as from a parser or tokenizer),
 * and updates the parser state machine or triggers specific actions based on the code.
 *
 * @param {number} charCode - The character code to handle (e.g., ASCII code).
 * @returns {void}
 */
function handleCharacterInput(charCode) {
  switch (charCode) {
    // Whitespace characters (Tab, Line Feed, Form Feed, Space)
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      // Ignore whitespace, do nothing
      break;
    case 62:  // '>' character
      parserState = parserStateAfterTagName;
      resetParserState();
      break;
    case 34:  // '"' character (double quote)
      handleAttributeValueStart();
      parserState = parserStateAttributeValueDoubleQuoted;
      break;
    case 39:  // '\'' character (single quote)
      handleAttributeValueStart();
      parserState = parserStateAttributeValueSingleQuoted;
      break;
    case -1:  // End of input
      handleClassHandleCreation();
      resetParserState();
      finalizeParsing();
      break;
    default:
      // For any other character, handle class handle and set parser state to attribute value unquoted
      handleClassHandleCreation();
      parserState = parserStateAttributeValueUnquoted;
      break;
  }
}

module.exports = handleCharacterInput;