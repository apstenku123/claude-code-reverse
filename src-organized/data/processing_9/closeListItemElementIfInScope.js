/**
 * Checks if a <li> element is in the list item scope of the open elements stack.
 * If so, generates implied end tags (excluding <li>), and pops elements until <li> is removed.
 *
 * @param {Object} parserContext - The parser context containing the openElements stack and tag constants.
 * @param {Object} parserContext.openElements - The stack of open elements with helper methods.
 * @param {Object} parserContext.tagNames - An object containing tag name constants (e.g., { LI: 'li' }).
 * @returns {void}
 */
function closeListItemElementIfInScope(parserContext) {
  const { openElements, tagNames } = parserContext;

  // Check if a <li> element is in the current list item scope
  if (openElements.hasInListItemScope(tagNames.LI)) {
    // Generate implied end tags, excluding <li> itself
    openElements.generateImpliedEndTagsWithExclusion(tagNames.LI);
    // Pop elements from the stack until <li> is removed
    openElements.popUntilTagNamePopped(tagNames.LI);
  }
}

module.exports = closeListItemElementIfInScope;