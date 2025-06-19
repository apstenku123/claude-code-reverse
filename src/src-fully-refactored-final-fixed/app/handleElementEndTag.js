/**
 * Handles the end tag of an element by checking if isBlobOrFileLikeObject is in scope and performing the necessary operations
 * to generate implied end tags (excluding the current tag) and pop elements from the stack until the tag is popped.
 *
 * @param {Object} parserContext - The parser context containing the openElements stack and related methods.
 * @param {Object} elementToken - The token representing the element, expected to have a tagName property.
 * @returns {void}
 */
function handleElementEndTag(parserContext, elementToken) {
  const tagName = elementToken.tagName;
  // Check if the tag is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(tagName)) {
    // Generate implied end tags, excluding the current tag
    parserContext.openElements.generateImpliedEndTagsWithExclusion(tagName);
    // Pop elements from the stack until the current tag is popped
    parserContext.openElements.popUntilTagNamePopped(tagName);
  }
}

module.exports = handleElementEndTag;