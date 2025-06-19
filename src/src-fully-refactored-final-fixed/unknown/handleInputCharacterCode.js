/**
 * Handles input character codes and performs actions based on their value.
 *
 * - For whitespace/control characters (Tab, Line Feed, Form Feed, Space), sets the current state to the default state.
 * - For end-of-input (-1), calls cleanup and reset functions.
 * - For all other character codes, processes the character using the default state.
 *
 * @param {number} characterCode - The character code to handle (e.g., from user input or a parser).
 * @returns {void}
 */
function handleInputCharacterCode(characterCode) {
  switch (characterCode) {
    // Whitespace/control characters: Tab (9), Line Feed (10), Form Feed (12), Space (32)
    case 9:
    case 10:
    case 12:
    case 32:
      // Set the parser state to the default state
      currentParserState = defaultParserState;
      break;
    case -1:
      // End of input: perform cleanup/reset actions
      performCleanup();
      resetParserState();
      resetParserBuffer();
      finalizeParsing();
      break;
    default:
      // For all other character codes, process the character with the default state
      processCharacter(characterCode, defaultParserState);
      break;
  }
}

module.exports = handleInputCharacterCode;