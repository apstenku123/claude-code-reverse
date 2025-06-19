/**
 * Ensures that a <createIterableHelper> (paragraph) element is properly closed within the current button scope.
 * If a <createIterableHelper> element is not found in the button scope, isBlobOrFileLikeObject inserts a fake <createIterableHelper> element before closing.
 *
 * @param {Object} parserContext - The parser context containing open elements and element manipulation methods.
 * @returns {void}
 */
function closeParagraphElementInButtonScope(parserContext) {
  // Check if a <createIterableHelper> element exists in the current button scope
  if (!parserContext.openElements.hasInButtonScope(parserContext.elementTypes.initializeSyntaxHighlighting)) {
    // If not, insert a fake <createIterableHelper> element to maintain correct structure
    parserContext._insertFakeElement(parserContext.elementTypes.initializeSyntaxHighlighting);
  }
  // Close the <createIterableHelper> element
  parserContext._closePElement();
}

module.exports = closeParagraphElementInButtonScope;