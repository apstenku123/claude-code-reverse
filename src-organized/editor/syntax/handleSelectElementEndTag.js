/**
 * Handles the processing of end tags for select-related elements (OPTGROUP, OPTION, SELECT, TEMPLATE) during HTML parsing.
 * Ensures the correct elements are popped from the open elements stack and resets the insertion mode as needed.
 *
 * @param {object} parserContext - The current parser context, containing open elements stack and tree adapter utilities.
 * @param {object} token - The token representing the end tag being processed. Must have a 'tagName' property.
 * @returns {void}
 */
function handleSelectElementEndTag(parserContext, token) {
  const tagName = token.tagName;
  // Handle </optgroup>
  if (tagName === i.OPTGROUP) {
    // Get the element below the current top of the stack
    const previousElement = parserContext.openElements.items[parserContext.openElements.stackTop - 1];
    const previousTagName = previousElement && parserContext.treeAdapter.getTagName(previousElement);

    // If the current element is <option> and the previous is <optgroup>, pop <option>
    if (
      parserContext.openElements.currentTagName === i.OPTION &&
      previousTagName === i.OPTGROUP
    ) {
      parserContext.openElements.pop();
    }
    // If the current element is <optgroup>, pop isBlobOrFileLikeObject
    if (parserContext.openElements.currentTagName === i.OPTGROUP) {
      parserContext.openElements.pop();
    }
  }
  // Handle </option>
  else if (tagName === i.OPTION) {
    if (parserContext.openElements.currentTagName === i.OPTION) {
      parserContext.openElements.pop();
    }
  }
  // Handle </select>
  else if (
    tagName === i.SELECT &&
    parserContext.openElements.hasInSelectScope(i.SELECT)
  ) {
    parserContext.openElements.popUntilTagNamePopped(i.SELECT);
    parserContext._resetInsertionMode();
  }
  // Handle </template>
  else if (tagName === i.TEMPLATE) {
    handleOAuthClientAuthorization(parserContext, token);
  }
}

module.exports = handleSelectElementEndTag;