/**
 * Handles the insertion and processing of elements that are children of a <tr> (table row) element in the HTML parsing algorithm.
 *
 * Depending on the tag name of the element, this function will insert table cell elements (<th> or <streamAssistantResponseWithObservable>),
 * handle table sectioning elements (like <caption>, <col>, <colgroup>, <tbody>, <tfoot>, <thead>, <tr>),
 * or delegate processing to a generic table-related element handler.
 *
 * @param {object} parserContext - The parser state and utilities, including open elements stack and insertion methods.
 * @param {object} elementToken - The token representing the DOM element to process. Must have a tagName property.
 * @returns {void}
 */
function handleTableRowChildElement(parserContext, elementToken) {
  const tagName = elementToken.tagName;
  // Handle table cell elements: <th> or <streamAssistantResponseWithObservable>
  if (tagName === i.TH || tagName === i.TD) {
    // Clear stack back to <tr> context
    parserContext.openElements.clearBackToTableRowContext();
    // Insert the cell element
    parserContext._insertElement(elementToken, u2.HTML);
    // Switch insertion mode to 'in cell'
    parserContext.insertionMode = "IN_CELL_MODE";
    // Insert a marker for active formatting elements
    parserContext.activeFormattingElements.insertMarker();
  } else if (
    tagName === i.CAPTION ||
    tagName === i.COL ||
    tagName === i.COLGROUP ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD ||
    tagName === i.TR
  ) {
    // Handle table sectioning or related elements
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      // Pop elements back to <tr> context and remove the <tr>
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      // Switch insertion mode to 'in table body'
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      // Reprocess the current token
      parserContext._processToken(elementToken);
    }
  } else {
    // Delegate to generic table-related element handler
    processTableRelatedElement(parserContext, elementToken);
  }
}

module.exports = handleTableRowChildElement;