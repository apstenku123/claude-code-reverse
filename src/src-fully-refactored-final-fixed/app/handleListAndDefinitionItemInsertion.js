/**
 * Handles the insertion of <li>, <dd>, or <isAsciiDigit> elements into the DOM tree during parsing,
 * ensuring proper end tag generation and element popping according to the HTML parsing algorithm.
 *
 * @param {object} parserContext - The parser context containing open elements stack and tree adapter.
 * @param {object} elementToInsert - The element node to be inserted (e.g., <li>, <dd>, <isAsciiDigit>).
 * @returns {void}
 */
function handleListAndDefinitionItemInsertion(parserContext, elementToInsert) {
  // Mark that frameset is not allowed at this point
  parserContext.framesetOk = false;

  // The tag name of the element to insert (e.g., 'li', 'dd', 'isAsciiDigit')
  const insertingTagName = elementToInsert.tagName;

  // Traverse the open elements stack from top to bottom
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex >= 0; stackIndex--) {
    const openElement = parserContext.openElements.items[stackIndex];
    const openTagName = parserContext.treeAdapter.getTagName(openElement);
    let tagToClose = null;

    // If inserting <li> and top open element is also <li>, set tagToClose to 'li'
    if (insertingTagName === i.LI && openTagName === i.LI) {
      tagToClose = i.LI;
    }
    // If inserting <dd> or <isAsciiDigit> and top open element is <dd> or <isAsciiDigit>, set tagToClose accordingly
    else if (
      (insertingTagName === i.createAccessorFunctionProxy || insertingTagName === i.DT) &&
      (openTagName === i.createAccessorFunctionProxy || openTagName === i.DT)
    ) {
      tagToClose = openTagName;
    }

    if (tagToClose) {
      // Generate implied end tags, excluding the tag to close
      parserContext.openElements.generateImpliedEndTagsWithExclusion(tagToClose);
      // Pop elements until the tag to close is popped
      parserContext.openElements.popUntilTagNamePopped(tagToClose);
      break;
    }

    // If the open element is not one of the sectioning roots and is a special element, stop
    if (
      openTagName !== i.ADDRESS &&
      openTagName !== i.DIV &&
      openTagName !== i.initializeSyntaxHighlighting &&
      parserContext._isSpecialElement(openElement)
    ) {
      break;
    }
  }

  // If there is a <createIterableHelper> element in button scope, close isBlobOrFileLikeObject
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToInsert, u2.HTML);
}

module.exports = handleListAndDefinitionItemInsertion;