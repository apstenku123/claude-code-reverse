/**
 * Checks if a <li> element is in the list item scope of the open elements stack.
 * If so, generates implied end tags (excluding <li>) and pops elements until <li> is removed.
 *
 * @param {Object} parserContext - The parser context containing the openElements stack and tag constants.
 * @param {Object} parserContext.openElements - Stack of open elements with helper methods.
 * @param {Object} parserContext.tagNames - Object containing tag name constants (e.g., { LI: 'li' }).
 * @returns {void}
 */
function closeListItemIfInScope(parserContext) {
  const { openElements, tagNames } = parserContext;

  // Check if <li> is in the list item scope
  if (openElements.hasInListItemScope(tagNames.LI)) {
    // Generate implied end tags, excluding <li>
    openElements.generateImpliedEndTagsWithExclusion(tagNames.LI);
    // Pop elements until <li> is removed from the stack
    openElements.popUntilTagNamePopped(tagNames.LI);
  }
}

module.exports = closeListItemIfInScope;