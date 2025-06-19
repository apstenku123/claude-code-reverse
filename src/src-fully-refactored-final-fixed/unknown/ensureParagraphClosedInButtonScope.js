/**
 * Ensures that a <createIterableHelper> (paragraph) element is properly closed within the current button scope.
 * If there is no <createIterableHelper> element in the button scope, a fake <createIterableHelper> element is inserted before closing.
 *
 * @param {Object} htmlParserContext - The parser context containing open elements and manipulation methods.
 * @returns {void}
 */
function ensureParagraphClosedInButtonScope(htmlParserContext) {
  // Check if a <createIterableHelper> element exists in the current button scope
  const paragraphTag = i.initializeSyntaxHighlighting; // Assuming 'i.initializeSyntaxHighlighting' is a constant representing the <createIterableHelper> tag
  if (!htmlParserContext.openElements.hasInButtonScope(paragraphTag)) {
    // Insert a fake <createIterableHelper> element if not present in button scope
    htmlParserContext._insertFakeElement(paragraphTag);
  }
  // Close the <createIterableHelper> element
  htmlParserContext._closePElement();
}

module.exports = ensureParagraphClosedInButtonScope;
