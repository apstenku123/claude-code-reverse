/**
 * Ensures that a <createIterableHelper> (paragraph) element is properly closed in the current open elements stack.
 * If there is no <createIterableHelper> element in button scope, isBlobOrFileLikeObject inserts a fake <createIterableHelper> element before closing isBlobOrFileLikeObject.
 *
 * @param {Object} htmlParserContext - The parser context containing open elements and manipulation methods.
 * @returns {void}
 */
function ensureParagraphClosed(htmlParserContext) {
  // Check if a <createIterableHelper> element is present in the button scope of the open elements stack
  if (!htmlParserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // If not, insert a fake <createIterableHelper> element to maintain correct HTML structure
    htmlParserContext._insertFakeElement(i.initializeSyntaxHighlighting);
  }
  // Close the <createIterableHelper> element (real or fake)
  htmlParserContext._closePElement();
}

module.exports = ensureParagraphClosed;