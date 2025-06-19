/**
 * Resets the open elements stack to the table context, inserts a new element, and sets the insertion mode to 'IN_TABLE_BODY_MODE'.
 *
 * @param {Object} parserContext - The parser context object that manages open elements and insertion modes.
 * @param {Object} elementToInsert - The element to be inserted into the parser context.
 * @returns {void}
 */
function resetTableContextAndInsertElement(parserContext, elementToInsert) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert the provided element into the parser context with HTML namespace
  parserContext._insertElement(elementToInsert, u2.HTML);

  // Set the insertion mode to 'IN_TABLE_BODY_MODE'
  parserContext.insertionMode = "IN_TABLE_BODY_MODE";
}

module.exports = resetTableContextAndInsertElement;