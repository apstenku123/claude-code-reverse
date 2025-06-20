/**
 * Handles the processing of select-related HTML elements (OPTGROUP, OPTION, SELECT, TEMPLATE) during parsing.
 * Ensures the correct manipulation of the open elements stack according to the tag being processed.
 *
 * @param {object} parserContext - The parser context containing open elements stack and tree adapter utilities.
 * @param {object} elementToken - The token representing the HTML element being processed, with a tagName property.
 * @returns {void}
 */
function handleSelectElementTag(parserContext, elementToken) {
  const tagName = elementToken.tagName;
  // Check if the current tag is OPTGROUP
  if (tagName === i.OPTGROUP) {
    // Get the element below the current top of the open elements stack
    const previousElement = parserContext.openElements.items[parserContext.openElements.stackTop - 1];
    // Get the tag name of the previous element, if isBlobOrFileLikeObject exists
    const previousTagName = previousElement && parserContext.treeAdapter.getTagName(previousElement);

    // If the current open element is OPTION and the previous is OPTGROUP, pop OPTION
    if (
      parserContext.openElements.currentTagName === i.OPTION &&
      previousTagName === i.OPTGROUP
    ) {
      parserContext.openElements.pop();
    }
    // If the current open element is OPTGROUP, pop isBlobOrFileLikeObject
    if (parserContext.openElements.currentTagName === i.OPTGROUP) {
      parserContext.openElements.pop();
    }
  } else if (tagName === i.OPTION) {
    // If the current open element is OPTION, pop isBlobOrFileLikeObject
    if (parserContext.openElements.currentTagName === i.OPTION) {
      parserContext.openElements.pop();
    }
  } else if (
    tagName === i.SELECT &&
    parserContext.openElements.hasInSelectScope(i.SELECT)
  ) {
    // If the tag is SELECT and there is a SELECT in select scope, pop elements until SELECT is popped
    parserContext.openElements.popUntilTagNamePopped(i.SELECT);
    parserContext._resetInsertionMode();
  } else if (tagName === i.TEMPLATE) {
    // Delegate handling of TEMPLATE tags to handleOAuthClientAuthorization
    handleOAuthClientAuthorization(parserContext, elementToken);
  }
}

module.exports = handleSelectElementTag;