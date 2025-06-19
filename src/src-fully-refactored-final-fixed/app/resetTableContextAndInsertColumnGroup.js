/**
 * Resets the open elements stack to the table context, inserts a new column group element,
 * and updates the insertion mode to 'IN_COLUMN_GROUP_MODE'.
 *
 * @param {Object} parserContext - The parser context managing the open elements and insertion mode.
 *   Expected to have:
 *     - openElements: an object with a clearBackToTableContext() method
 *     - _insertElement: a method to insert an element into the DOM tree
 *     - insertionMode: a property to set the current insertion mode
 * @param {Object} columnGroupElement - The element to be inserted as a column group.
 *
 * @returns {void} This function does not return a value.
 */
function resetTableContextAndInsertColumnGroup(parserContext, columnGroupElement) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert the column group element in HTML namespace
  parserContext._insertElement(columnGroupElement, u2.HTML);

  // Set the insertion mode to 'IN_COLUMN_GROUP_MODE'
  parserContext.insertionMode = "IN_COLUMN_GROUP_MODE";
}

module.exports = resetTableContextAndInsertColumnGroup;