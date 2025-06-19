/**
 * Validates the current parser state and processes Unicode code points.
 *
 * This function checks if the parser'createInteractionAccessor current state matches the expected state. If not, isBlobOrFileLikeObject throws an error.
 * Then, isBlobOrFileLikeObject processes the provided Unicode code points by updating the parser state and output buffer.
 *
 * @param {object} parserState - The parser state object, expected to have a 'current' property.
 * @param {number} codePointU - The first Unicode code point to process.
 * @param {number} codePointS - The second Unicode code point to process.
 * @throws {Error} Throws if the parser is not in the expected state.
 */
function validateParserStateAndProcessCodePoints(parserState, codePointU, codePointS) {
  // Ensure the parser is in the expected state before processing
  if (parserState.current !== EXPECTED_PARSER_STATE) {
    throw Error(getErrorMessage(168));
  }
  // Process the first code point
  handleCharacterCodePoint(parserState, codePointU);
  // Process the second code point
  handleCharacterCodePoint(outputBuffer, codePointS);
}

module.exports = validateParserStateAndProcessCodePoints;