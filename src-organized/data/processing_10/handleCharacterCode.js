/**
 * Handles a character code during parsing, updating the parser state and output buffer as needed.
 *
 * @param {number} characterCode - The Unicode code point of the character to handle.
 * @param {Object} parserContext - The parser context containing state and buffers.
 * @param {Array<number>} parserContext.outputBuffer - The buffer to which parsed character codes are pushed.
 * @param {function} parserContext.handleTagEnd - Function to handle the end of a tag.
 * @param {function} parserContext.handleParseAdvance - Function to advance the parser state.
 * @param {function} parserContext.handleParseError - Function to handle parse errors.
 * @param {Object} parserContext - The parser context containing state variables.
 * @param {Object} parserContext.parserState - The current parser state object.
 * @param {Object} parserContext.attributeValueState - The parser state for attribute values.
 * @param {Object} parserContext.tagOpenState - The parser state for tag opening.
 *
 * @returns {void}
 */
function handleCharacterCode(characterCode, parserContext) {
  const {
    outputBuffer,
    handleTagEnd,
    handleParseAdvance,
    handleParseError,
    parserState,
    attributeValueState,
    tagOpenState
  } = parserContext;

  switch (characterCode) {
    case 34: // '"' - End of attribute value (double quote)
      parserState.current = attributeValueState;
      break;
    case 0: // NULL character (invalid in HTML)
      outputBuffer.push(65533); // Unicode replacement character
      break;
    case 62: // '>' - End of tag
      handleTagEnd();
      parserState.current = tagOpenState;
      handleParseAdvance();
      break;
    case -1: // End of input
      handleTagEnd();
      handleParseAdvance();
      handleParseError();
      break;
    default:
      outputBuffer.push(characterCode);
      break;
  }
}

module.exports = handleCharacterCode;