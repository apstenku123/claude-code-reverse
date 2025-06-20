/**
 * Inserts a column group element into the open elements stack and updates the insertion mode.
 *
 * This function clears the open elements stack back to the table context,
 * inserts the provided column group element, and sets the insertion mode to 'IN_COLUMN_GROUP_MODE'.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and insertion methods.
 * @param {object} columnGroupElement - The element to be inserted as a column group.
 * @returns {void}
 */
function insertColumnGroupElement(parserContext, columnGroupElement) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert the column group element in HTML namespace
  parserContext._insertElement(columnGroupElement, u2.HTML);

  // Set the insertion mode to 'IN_COLUMN_GROUP_MODE'
  parserContext.insertionMode = "IN_COLUMN_GROUP_MODE";
}

module.exports = insertColumnGroupElement;