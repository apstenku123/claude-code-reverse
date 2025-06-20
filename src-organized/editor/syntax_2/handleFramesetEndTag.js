/**
 * Handles the end tag for a <frameset> element during HTML parsing.
 *
 * This function checks if the current tag is a FRAMESET and if the root HTML element is not the current open element.
 * If so, isBlobOrFileLikeObject pops the current open element from the stack. If there is no fragment context and the new current tag
 * is not a FRAMESET, isBlobOrFileLikeObject sets the insertion mode to 'AFTER_FRAMESET_MODE'.
 *
 * @param {object} parserContext - The parser context, containing openElements stack and parsing state.
 * @param {object} currentToken - The current token being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleFramesetEndTag(parserContext, currentToken) {
  // Check if the current token is a FRAMESET and the root HTML element is not the current open element
  if (
    currentToken.tagName === i.FRAMESET &&
    !parserContext.openElements.isRootHtmlElementCurrent()
  ) {
    // Pop the current open element from the stack
    parserContext.openElements.pop();

    // If not in fragment context and the new current tag is not a FRAMESET, set insertion mode
    if (
      !parserContext.fragmentContext &&
      parserContext.openElements.currentTagName !== i.FRAMESET
    ) {
      parserContext.insertionMode = "AFTER_FRAMESET_MODE";
    }
  }
}

module.exports = handleFramesetEndTag;