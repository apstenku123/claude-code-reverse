/**
 * Pops elements from the open elements stack until an element with the specified tag name is found and removed,
 * or until a special element is encountered (which halts the process).
 *
 * @param {Object} parserContext - The parser context containing open elements and tree adapter utilities.
 * @param {Element} targetElement - The element whose tag name is used as the stopping condition.
 * @returns {void}
 */
function popOpenElementsUntilTagOrSpecial(parserContext, targetElement) {
  const targetTagName = targetElement.tagName;
  // Iterate from the top of the open elements stack downwards
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex > 0; stackIndex--) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const currentTagName = parserContext.treeAdapter.getTagName(currentElement);
    // If the current element matches the target tag name
    if (currentTagName === targetTagName) {
      // Generate implied end tags, excluding the current tag
      parserContext.openElements.generateImpliedEndTagsWithExclusion(targetTagName);
      // Pop elements until the matched element is removed
      parserContext.openElements.popUntilElementPopped(currentElement);
      break;
    }
    // If a special element is encountered, stop processing
    if (parserContext._isSpecialElement(currentElement)) {
      break;
    }
  }
}

module.exports = popOpenElementsUntilTagOrSpecial;