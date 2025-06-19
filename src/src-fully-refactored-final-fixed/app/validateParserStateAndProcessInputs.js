/**
 * Validates the current parser state and processes input character codes.
 *
 * This function ensures that the parser is in the expected state before processing
 * the provided character codes. If the parser state is invalid, isBlobOrFileLikeObject throws an error.
 * Otherwise, isBlobOrFileLikeObject processes the input and supplementary character codes using the
 * handleInputCharacterCode function.
 *
 * @param {object} parserState - The current parser state object.
 * @param {number} inputCharCode - The main input character code to process.
 * @param {number} supplementaryCharCode - The supplementary character code to process.
 * @throws {Error} Throws an error if the parser is not in the expected state.
 * @returns {void}
 */
function validateParserStateAndProcessInputs(parserState, inputCharCode, supplementaryCharCode) {
  // Ensure the parser is in the expected state before processing inputs
  if (parserState.current !== EXPECTED_PARSER_STATE) {
    // Throw a descriptive error if the state is invalid
    throw Error(getErrorMessage(168));
  }
  // Process the main input character code
  handleInputCharacterCode(parserState, inputCharCode);
  // Process the supplementary character code (e.g., for lookahead or buffer management)
  handleInputCharacterCode(characterBuffer, supplementaryCharCode);
}

module.exports = validateParserStateAndProcessInputs;