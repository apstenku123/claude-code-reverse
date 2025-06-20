/**
 * Handles the insertion of list item (LI) and definition list (createAccessorFunctionProxy/DT) elements in the HTML parsing process.
 * Ensures proper closing of open elements and maintains correct document structure according to the HTML parsing algorithm.
 *
 * @param {object} parserContext - The parser context containing open elements, tree adapter, and helper methods.
 * @param {object} elementToken - The token representing the element to be inserted (e.g., LI, createAccessorFunctionProxy, DT).
 * @returns {void}
 */
function handleListAndDefinitionElementInsertion(parserContext, elementToken) {
  // Mark that frameset is not allowed at this point
  parserContext.framesetOk = false;

  // Get the tag name of the element to be inserted
  const newElementTagName = elementToken.tagName;

  // Traverse the stack of open elements from top to bottom
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex >= 0; stackIndex--) {
    const openElement = parserContext.openElements.items[stackIndex];
    const openElementTagName = parserContext.treeAdapter.getTagName(openElement);
    let matchingTagName = null;

    // If both the new element and the open element are LI, set matchingTagName to LI
    if (newElementTagName === i.LI && openElementTagName === i.LI) {
      matchingTagName = i.LI;
    }
    // If both the new element and the open element are createAccessorFunctionProxy or DT, set matchingTagName to the open element'createInteractionAccessor tag name
    else if (
      (newElementTagName === i.createAccessorFunctionProxy || newElementTagName === i.DT) &&
      (openElementTagName === i.createAccessorFunctionProxy || openElementTagName === i.DT)
    ) {
      matchingTagName = openElementTagName;
    }

    if (matchingTagName) {
      // Generate implied end tags except for the matching tag
      parserContext.openElements.generateImpliedEndTagsWithExclusion(matchingTagName);
      // Pop elements from the stack until the matching tag is popped
      parserContext.openElements.popUntilTagNamePopped(matchingTagName);
      break;
    }

    // If the open element is not ADDRESS, DIV, or initializeSyntaxHighlighting, and is a special element, stop traversing
    if (
      openElementTagName !== i.ADDRESS &&
      openElementTagName !== i.DIV &&
      openElementTagName !== i.initializeSyntaxHighlighting &&
      parserContext._isSpecialElement(openElement)
    ) {
      break;
    }
  }

  // If there is a initializeSyntaxHighlighting element in button scope, close isBlobOrFileLikeObject
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Insert the new element into the document
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = handleListAndDefinitionElementInsertion;