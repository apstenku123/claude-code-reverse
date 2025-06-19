/**
 * Handles the insertion mode for template elements in the open elements stack.
 * If there are template elements present, isBlobOrFileLikeObject pops elements until a TEMPLATE tag is found,
 * clears formatting elements up to the last marker, resets the template insertion mode,
 * resets the general insertion mode, and processes the provided token.
 * If no template elements are present, isBlobOrFileLikeObject marks the parser as stopped.
 *
 * @param {object} parserContext - The parser context containing open elements, formatting elements, and state management methods.
 * @param {object} token - The token to be processed if templates are present.
 * @returns {void}
 */
function handleTemplateInsertionMode(parserContext, token) {
  // Check if there are any template elements in the open elements stack
  if (parserContext.openElements.tmplCount > 0) {
    // Pop elements until a TEMPLATE tag is found
    parserContext.openElements.popUntilTagNamePopped(parserContext.TEMPLATE);
    // Clear active formatting elements up to the last marker
    parserContext.activeFormattingElements.clearToLastMarker();
    // Reset the template insertion mode
    parserContext._popTmplInsertionMode();
    // Reset the general insertion mode
    parserContext._resetInsertionMode();
    // Process the current token
    parserContext._processToken(token);
  } else {
    // If no template elements, mark the parser as stopped
    parserContext.stopped = true;
  }
}

module.exports = handleTemplateInsertionMode;