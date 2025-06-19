/**
 * Handles pending script tracking and restores the original insertion mode.
 *
 * If the provided element is a <script> tag, marks the current open element as the pending script.
 * Then, pops the top element from the open elements stack and resets the insertion mode to its original value.
 *
 * @param {Object} parserContext - The parser context containing open elements and insertion mode state.
 * @param {Object} element - The element being processed, expected to have a tagName property.
 * @returns {void}
 */
function handlePendingScriptAndRestoreInsertionMode(parserContext, element) {
  // Check if the element is a <script> tag
  if (element.tagName === i.SCRIPT) {
    // Mark the current open element as the pending script
    parserContext.pendingScript = parserContext.openElements.current;
  }
  // Remove the top element from the open elements stack
  parserContext.openElements.pop();
  // Restore the original insertion mode
  parserContext.insertionMode = parserContext.originalInsertionMode;
}

module.exports = handlePendingScriptAndRestoreInsertionMode;