/**
 * Inserts an element into the current table context and updates the insertion mode.
 *
 * This function first clears the open elements stack back to the table context,
 * then inserts the provided element as an HTML element, and finally sets the
 * insertion mode to 'IN_TABLE_BODY_MODE'.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and insertion methods.
 * @param {object} elementToInsert - The element to be inserted into the table context.
 * @returns {void}
 */
function insertElementInTableContext(parserContext, elementToInsert) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert the new element as an HTML element
  parserContext._insertElement(elementToInsert, u2.HTML);

  // Set the insertion mode to 'IN_TABLE_BODY_MODE'
  parserContext.insertionMode = "IN_TABLE_BODY_MODE";
}

module.exports = insertElementInTableContext;