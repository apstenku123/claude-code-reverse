/**
 * Handles the processing of table column-related elements during parsing.
 * Determines the correct action based on the tag name of the current element.
 *
 * @param {Object} parserContext - The current parser context, including open elements and insertion mode.
 * @param {Object} elementToken - The token representing the element being processed, with a tagName property.
 * @returns {void}
 */
function handleTableColumnElement(parserContext, elementToken) {
  const tagName = elementToken.tagName;

  // If the tag is COLGROUP
  if (tagName === i.COLGROUP) {
    // If the top of the open elements stack is also COLGROUP, pop isBlobOrFileLikeObject and change insertion mode
    if (parserContext.openElements.currentTagName === i.COLGROUP) {
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
    }
  } else if (tagName === i.TEMPLATE) {
    // If the tag is TEMPLATE, delegate to the template handler
    handleOAuthClientAuthorization(parserContext, elementToken);
  } else if (tagName !== i.COL) {
    // For any other tag except COL, delegate to the generic handler
    handleColgroupEndTagInTable(parserContext, elementToken);
  }
}

module.exports = handleTableColumnElement;