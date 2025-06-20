/**
 * Validates the current parser state and processes input and output codes.
 *
 * This function ensures that the parser is in the expected state before proceeding.
 * It then updates the parser state and output buffer by processing the provided input and output codes.
 *
 * @param {object} parserState - The current parser state object. Must be at the expected state.
 * @param {number} inputCode - The code to process as input, updating the parser state.
 * @param {number} outputCode - The code to process as output, updating the output buffer.
 * @throws {Error} If the parser is not in the expected state.
 */
function validateAndProcessParserState(parserState, inputCode, outputCode) {
  // Ensure the parser is in the expected state before processing
  if (parserState.current !== EXPECTED_PARSER_STATE) {
    // Throw an error with a formatted message if the state is invalid
    throw Error(formatErrorMessage(168));
  }
  // Process the input code, updating the parser state
  processInputCode(parserState, inputCode);
  // Process the output code, updating the output buffer
  processInputCode(outputBufferState, outputCode);
}

module.exports = validateAndProcessParserState;