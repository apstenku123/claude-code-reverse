/**
 * Pops elements from the open elements stack until a matching tag name is found or a special element is encountered.
 *
 * This function iterates through the open elements stack (from top to bottom), looking for an element
 * whose tag name matches the provided element'createInteractionAccessor tag name. If found, isBlobOrFileLikeObject generates implied end tags (excluding
 * the matching tag) and pops elements until the matching element is removed from the stack. If a special element
 * is encountered before finding a match, the process stops.
 *
 * @param {object} parserContext - The parser context containing open elements and tree adapter utilities.
 * @param {object} targetElement - The element whose tag name is used as the search criterion.
 * @returns {void}
 */
function popElementsUntilMatchingTagOrSpecial(parserContext, targetElement) {
  const targetTagName = targetElement.tagName;
  // Iterate from the top of the open elements stack downwards
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex > 0; stackIndex--) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const currentTagName = parserContext.treeAdapter.getTagName(currentElement);

    if (currentTagName === targetTagName) {
      // Generate implied end tags, excluding the matching tag
      parserContext.openElements.generateImpliedEndTagsWithExclusion(targetTagName);
      // Pop elements until the matching element is removed
      parserContext.openElements.popUntilElementPopped(currentElement);
      break;
    }
    // If a special element is encountered, stop processing
    if (parserContext._isSpecialElement(currentElement)) {
      break;
    }
  }
}

module.exports = popElementsUntilMatchingTagOrSpecial;