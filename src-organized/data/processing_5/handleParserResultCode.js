/**
 * Handles the result code returned by a parser and triggers appropriate actions.
 *
 * @param {number} resultCode - The result code returned by the parser. Typically, 62 indicates a specific success or state, -1 indicates an error or end-of-input, and other values are ignored.
 * @returns {void}
 */
function handleParserResultCode(resultCode) {
  switch (resultCode) {
    case 62:
      // Set the parser state to the 'O9' state and perform the main parser action
      parserState = parserStateO9;
      performParserAction();
      break;
    case -1:
      // Perform the main parser action and then handle parser exit/cleanup
      performParserAction();
      handleParserExit();
      break;
    default:
      // For all other result codes, do nothing
      break;
  }
}

module.exports = handleParserResultCode;