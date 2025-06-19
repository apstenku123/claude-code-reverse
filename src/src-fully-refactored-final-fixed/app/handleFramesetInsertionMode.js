/**
 * Handles the insertion mode when a <frameset> tag is encountered during parsing.
 * If the current tag is a FRAMESET and the root HTML element is not current,
 * isBlobOrFileLikeObject pops the current element from the open elements stack. If not in a fragment context
 * and the new current tag is not a FRAMESET, isBlobOrFileLikeObject sets the insertion mode to 'AFTER_FRAMESET_MODE'.
 *
 * @param {object} parserContext - The parser context containing open elements and state.
 * @param {object} currentToken - The current token being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleFramesetInsertionMode(parserContext, currentToken) {
  // Check if the current token is a FRAMESET and the root HTML element is not current
  if (
    currentToken.tagName === i.FRAMESET &&
    !parserContext.openElements.isRootHtmlElementCurrent()
  ) {
    // Pop the current element from the open elements stack
    parserContext.openElements.pop();
    // If not in a fragment context and the new current tag is not a FRAMESET
    if (
      !parserContext.fragmentContext &&
      parserContext.openElements.currentTagName !== i.FRAMESET
    ) {
      // Set the insertion mode to AFTER_FRAMESET_MODE
      parserContext.insertionMode = "AFTER_FRAMESET_MODE";
    }
  }
}

module.exports = handleFramesetInsertionMode;