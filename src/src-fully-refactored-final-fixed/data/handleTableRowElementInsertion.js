/**
 * Handles the insertion of elements within the context of an HTML table row during parsing.
 * Determines the correct action based on the tag name of the element being processed.
 *
 * @param {Object} parserContext - The parser context object, containing open elements stack and insertion logic.
 * @param {Element} element - The DOM element to be inserted or processed.
 * @returns {void}
 */
function handleTableRowElementInsertion(parserContext, element) {
  const tagName = element.tagName;

  // If the element is a table cell (TH or TD)
  if (tagName === i.TH || tagName === i.TD) {
    // Clear elements back to the table row context
    parserContext.openElements.clearBackToTableRowContext();
    // Insert the cell element into the DOM
    parserContext._insertElement(element, u2.HTML);
    // Set the insertion mode to 'in cell'
    parserContext.insertionMode = "IN_CELL_MODE";
    // Insert a marker into the active formatting elements list
    parserContext.activeFormattingElements.insertMarker();
  }
  // If the element is a table section or related element
  else if (
    tagName === i.CAPTION ||
    tagName === i.COL ||
    tagName === i.COLGROUP ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD ||
    tagName === i.TR
  ) {
    // Only proceed if there is a <tr> element in table scope
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      // Clear elements back to the table row context
      parserContext.openElements.clearBackToTableRowContext();
      // Pop the <tr> element from the stack
      parserContext.openElements.pop();
      // Set the insertion mode to 'in table body'
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      // Re-process the current element token
      parserContext._processToken(element);
    }
  }
  // For all other elements, delegate to the table-related element processor
  else {
    processTableRelatedElement(parserContext, element);
  }
}

module.exports = handleTableRowElementInsertion;