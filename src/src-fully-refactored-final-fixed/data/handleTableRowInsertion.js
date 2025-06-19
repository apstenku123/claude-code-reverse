/**
 * Handles the insertion and processing of table row-related elements in the DOM tree builder.
 * Determines the correct action based on the tag name of the provided element, ensuring proper table context handling.
 *
 * @param {Object} treeBuilder - The tree builder instance managing open elements and insertion modes.
 * @param {Element} element - The DOM element to be processed and potentially inserted.
 */
function handleTableRowInsertion(treeBuilder, element) {
  const tagName = element.tagName;

  // Check if the element is a table cell (TH or TD)
  if (tagName === i.TH || tagName === i.TD) {
    // Clear elements back to the table row context
    treeBuilder.openElements.clearBackToTableRowContext();
    // Insert the cell element into the DOM
    treeBuilder._insertElement(element, u2.HTML);
    // Set the insertion mode to 'in cell'
    treeBuilder.insertionMode = "IN_CELL_MODE";
    // Insert a marker for active formatting elements
    treeBuilder.activeFormattingElements.insertMarker();
  } else if (
    tagName === i.CAPTION ||
    tagName === i.COL ||
    tagName === i.COLGROUP ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD ||
    tagName === i.TR
  ) {
    // If the element is a table section or row
    if (treeBuilder.openElements.hasInTableScope(i.TR)) {
      // Clear elements back to the table row context
      treeBuilder.openElements.clearBackToTableRowContext();
      // Pop the current table row element
      treeBuilder.openElements.pop();
      // Switch insertion mode to 'in table body'
      treeBuilder.insertionMode = "IN_TABLE_BODY_MODE";
      // Re-process the current element token
      treeBuilder._processToken(element);
    }
  } else {
    // For all other elements, delegate to the table element processor
    processTableElementByTagName(treeBuilder, element);
  }
}

module.exports = handleTableRowInsertion;