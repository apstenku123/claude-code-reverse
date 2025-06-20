/**
 * Processes a token within the context of open elements, specifically handling template elements.
 * If there are template elements present in the openElements stack, isBlobOrFileLikeObject performs a series of operations
 * to pop elements, clear formatting, reset insertion mode, and process the token. If no template elements
 * are present, isBlobOrFileLikeObject marks the parser as stopped.
 *
 * @param {object} parserContext - The parser context containing openElements, activeFormattingElements, and related methods.
 * @param {object} token - The token to be processed.
 * @returns {void}
 */
function handleTemplateElementProcessing(parserContext, token) {
  // Check if there are any <template> elements in the openElements stack
  if (parserContext.openElements.tmplCount > 0) {
    // Pop elements from the stack until a <template> tag is popped
    parserContext.openElements.popUntilTagNamePopped(parserContext.TEMPLATE);
    // Clear the active formatting elements up to the last marker
    parserContext.activeFormattingElements.clearToLastMarker();
    // Pop the template insertion mode
    parserContext._popTmplInsertionMode();
    // Reset the insertion mode according to the current context
    parserContext._resetInsertionMode();
    // Process the current token
    parserContext._processToken(token);
  } else {
    // If no template elements are present, stop the parser
    parserContext.stopped = true;
  }
}

module.exports = handleTemplateElementProcessing;