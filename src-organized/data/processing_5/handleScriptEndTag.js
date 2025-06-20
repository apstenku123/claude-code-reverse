/**
 * Handles the logic for processing the end tag of a script element during HTML parsing.
 * If the current element is a <script> tag, isBlobOrFileLikeObject marks the pending script and restores the insertion mode.
 *
 * @param {Object} parserContext - The parser context containing open elements and state.
 * @param {Object} currentElement - The element currently being processed (potentially a closing tag).
 * @returns {void}
 */
function handleScriptEndTag(parserContext, currentElement) {
  // Check if the current element is a <script> tag
  if (currentElement.tagName === i.SCRIPT) {
    // Mark the pending script as the current open element
    parserContext.pendingScript = parserContext.openElements.current;
  }
  // Remove the current element from the open elements stack
  parserContext.openElements.pop();
  // Restore the original insertion mode
  parserContext.insertionMode = parserContext.originalInsertionMode;
}

module.exports = handleScriptEndTag;