/**
 * Pops elements from the open elements stack until an element with the same tag name as the target element is found,
 * or until a special element is encountered. If the matching tag is found, implied end tags are generated (excluding
 * the matching tag), and elements are popped until the matching element is removed from the stack.
 *
 * @param {object} parserContext - The parser context containing open elements stack and tree adapter utilities.
 * @param {object} targetElement - The element whose tag name is used as the search target in the stack.
 * @returns {void}
 */
function popOpenElementsUntilTagOrSpecialElement(parserContext, targetElement) {
  const targetTagName = targetElement.tagName;
  // Iterate from the top of the open elements stack downwards
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex > 0; stackIndex--) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const currentTagName = parserContext.treeAdapter.getTagName(currentElement);

    if (currentTagName === targetTagName) {
      // Generate implied end tags, excluding the target tag name
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

module.exports = popOpenElementsUntilTagOrSpecialElement;