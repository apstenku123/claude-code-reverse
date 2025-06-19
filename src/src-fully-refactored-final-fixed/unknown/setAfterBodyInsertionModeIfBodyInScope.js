/**
 * Sets the insertion mode to 'AFTER_BODY_MODE' if the 'BODY' element is in scope within the open elements stack.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and insertion mode.
 * @returns {void}
 */
function setAfterBodyInsertionModeIfBodyInScope(parserContext) {
  // Check if the 'BODY' element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(parserContext.BODY)) {
    // If so, set the insertion mode to 'AFTER_BODY_MODE'
    parserContext.insertionMode = "AFTER_BODY_MODE";
  }
}

module.exports = setAfterBodyInsertionModeIfBodyInScope;