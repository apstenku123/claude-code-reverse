/**
 * Handles the insertion mode for template elements in the parser.
 * If there are open <template> elements, isBlobOrFileLikeObject pops elements until the template tag is found,
 * clears formatting elements up to the last marker, resets the insertion mode, and processes the given token.
 * If there are no open <template> elements, isBlobOrFileLikeObject stops the parser.
 *
 * @param {object} parserContext - The parser context, containing open elements, formatting elements, and parser state.
 * @param {object} token - The token to process if in template insertion mode.
 * @returns {void}
 */
function handleTemplateInsertionOrStopParsing(parserContext, token) {
  // Check if there are open <template> elements
  if (parserContext.openElements.tmplCount > 0) {
    // Pop elements until the <template> tag is found
    parserContext.openElements.popUntilTagNamePopped(i.TEMPLATE);
    // Clear active formatting elements up to the last marker
    parserContext.activeFormattingElements.clearToLastMarker();
    // Pop the template insertion mode
    parserContext._popTmplInsertionMode();
    // Reset the insertion mode
    parserContext._resetInsertionMode();
    // Process the current token
    parserContext._processToken(token);
  } else {
    // If no open <template> elements, stop the parser
    parserContext.stopped = true;
  }
}

module.exports = handleTemplateInsertionOrStopParsing;