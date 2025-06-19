/**
 * Sets the insertion mode to 'AFTER_BODY_MODE' and processes the given token if the BODY element is in scope.
 *
 * @param {object} parserContext - The parser context containing open elements and insertion mode state.
 * @param {object} token - The token to process if the BODY element is in scope.
 * @returns {void}
 */
function handleAfterBodyInsertionMode(parserContext, token) {
  // Check if the BODY element is currently in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.BODY)) {
    // Set the insertion mode to AFTER_BODY_MODE
    parserContext.insertionMode = "AFTER_BODY_MODE";
    // Process the provided token in the new insertion mode
    parserContext._processToken(token);
  }
}

module.exports = handleAfterBodyInsertionMode;