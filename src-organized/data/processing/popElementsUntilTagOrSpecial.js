/**
 * Pops elements from the open elements stack until an element with the specified tag name is found and popped,
 * or until a special element is encountered. If the matching tag is found, implied end tags are generated (excluding that tag),
 * and elements are popped until the matching element is removed from the stack.
 *
 * @param {Object} parserContext - The parser context containing the open elements stack and tree adapter utilities.
 * @param {Object} targetElement - The element whose tagName is used as the target for popping elements.
 * @returns {void}
 */
function popElementsUntilTagOrSpecial(parserContext, targetElement) {
  const targetTagName = targetElement.tagName;
  // Iterate from the top of the open elements stack downwards
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex > 0; stackIndex--) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const currentTagName = parserContext.treeAdapter.getTagName(currentElement);

    if (currentTagName === targetTagName) {
      // Generate implied end tags, excluding the target tag
      parserContext.openElements.generateImpliedEndTagsWithExclusion(targetTagName);
      // Pop elements until the matching element is removed
      parserContext.openElements.popUntilElementPopped(currentElement);
      break;
    }
    // Stop if a special element is encountered
    if (parserContext._isSpecialElement(currentElement)) {
      break;
    }
  }
}

module.exports = popElementsUntilTagOrSpecial;