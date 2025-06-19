/**
 * Handles a character code during accessor parsing and updates the parser state accordingly.
 *
 * Depending on the character code provided, this function updates the current parser state variable,
 * invokes state transition functions, or processes the character as a default case.
 *
 * @param {number} characterCode - The Unicode code point of the character being processed.
 * @returns {void}
 */
function handleAccessorCharacterCode(characterCode) {
  // Handle whitespace characters (tab, line feed, form feed, space)
  switch (characterCode) {
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      currentParserState = defaultAccessorState;
      break;
    case 47:  // Forward Slash '/'
      currentParserState = parserStateSlash;
      break;
    case 62:  // Greater Than '>'
      currentParserState = parserStateTagClose;
      handleTagClose();
      break;
    case -1:  // End of input
      handleEndOfInput();
      break;
    default:
      // For all other character codes, process with default handler
      processCharacter(characterCode, defaultAccessorState);
      break;
  }
}

module.exports = handleAccessorCharacterCode;