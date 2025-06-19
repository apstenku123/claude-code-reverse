/**
 * Handles the EOF (End Of File) token when encountered inside an element that can only contain text.
 * This function performs error reporting, pops the current element from the open elements stack,
 * restores the original insertion mode, and processes the next token.
 *
 * @param {Object} parserContext - The parser context object, containing state and helper methods.
 * @param {Object} currentToken - The token to process after handling the EOF condition.
 * @returns {void}
 */
function handleEofInTextOnlyElement(parserContext, currentToken) {
  // Report an EOF error specific to elements that can only contain text
  parserContext._err(xG.eofInElementThatCanContainOnlyText);

  // Remove the current element from the stack of open elements
  parserContext.openElements.pop();

  // Restore the parser'createInteractionAccessor original insertion mode
  parserContext.insertionMode = parserContext.originalInsertionMode;

  // Continue processing with the provided token
  parserContext._processToken(currentToken);
}

module.exports = handleEofInTextOnlyElement;