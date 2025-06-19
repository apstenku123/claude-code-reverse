/**
 * Closes elements with a specific tag name if they are currently in scope in the open elements stack.
 *
 * This function checks if the provided tag name (from the element object) is in scope within the openElements stack.
 * If so, isBlobOrFileLikeObject generates implied end tags (excluding the given tag name) and pops elements from the stack until the tag name is removed.
 *
 * @param {object} parserContext - The parser context containing the openElements stack and related methods.
 * @param {object} element - The element object, expected to have a tagName property.
 * @returns {void}
 */
function closeElementsWithTagNameIfInScope(parserContext, element) {
  const tagName = element.tagName;
  // Check if the tag name is currently in scope in the open elements stack
  if (parserContext.openElements.hasInScope(tagName)) {
    // Generate implied end tags, excluding the current tag name
    parserContext.openElements.generateImpliedEndTagsWithExclusion(tagName);
    // Pop elements from the stack until the tag name is removed
    parserContext.openElements.popUntilTagNamePopped(tagName);
  }
}

module.exports = closeElementsWithTagNameIfInScope;