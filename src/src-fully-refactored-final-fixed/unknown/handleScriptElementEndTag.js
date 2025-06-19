/**
 * Handles the end tag for a script element during HTML parsing.
 * If the current element is a script, sets the pendingScript property.
 * Pops the current element from the open elements stack and restores the original insertion mode.
 *
 * @param {Object} parserContext - The parser context containing open elements and insertion mode.
 * @param {Object} endTagToken - The end tag token being processed. Should have a tagName property.
 * @returns {void}
 */
function handleScriptElementEndTag(parserContext, endTagToken) {
  // Check if the end tag is for a <script> element
  if (endTagToken.tagName === i.SCRIPT) {
    // Set the pendingScript to the current element in the open elements stack
    parserContext.pendingScript = parserContext.openElements.current;
  }
  // Remove the current element from the open elements stack
  parserContext.openElements.pop();
  // Restore the original insertion mode
  parserContext.insertionMode = parserContext.originalInsertionMode;
}

module.exports = handleScriptElementEndTag;