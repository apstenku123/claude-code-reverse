/**
 * Closes the element with the specified tag name if isBlobOrFileLikeObject is currently in scope.
 * This involves generating implied end tags, popping elements from the open elements stack
 * until the specified tag is removed, and clearing the active formatting elements up to the last marker.
 *
 * @param {Object} parserContext - The parser context containing openElements and activeFormattingElements.
 * @param {Object} elementToken - The token representing the element to close, must have a tagName property.
 * @returns {void}
 */
function closeElementIfInScope(parserContext, elementToken) {
  const tagNameToClose = elementToken.tagName;

  // Check if the tag name is currently in scope in the open elements stack
  if (parserContext.openElements.hasInScope(tagNameToClose)) {
    // Generate implied end tags as per the HTML parsing algorithm
    parserContext.openElements.generateImpliedEndTags();

    // Pop elements from the stack until the specified tag name is popped
    parserContext.openElements.popUntilTagNamePopped(tagNameToClose);

    // Clear active formatting elements up to the last marker
    parserContext.activeFormattingElements.clearToLastMarker();
  }
}

module.exports = closeElementIfInScope;