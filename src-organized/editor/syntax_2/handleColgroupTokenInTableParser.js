/**
 * Handles the insertion of a COLGROUP token within the table parsing context.
 * This function clears the open elements stack back to the table context,
 * inserts a fake COLGROUP element, sets the insertion mode to 'IN_COLUMN_GROUP_MODE',
 * and processes the provided token.
 *
 * @param {object} tableParser - The parser instance managing the open elements and insertion mode.
 * @param {object} token - The token to be processed after adjusting the parser state.
 * @returns {void}
 */
function handleColgroupTokenInTableParser(tableParser, token) {
  // Clear the stack of open elements back to the table context
  tableParser.openElements.clearBackToTableContext();

  // Insert a fake COLGROUP element into the parser'createInteractionAccessor stack
  tableParser._insertFakeElement(i.COLGROUP);

  // Set the parser'createInteractionAccessor insertion mode to handle column groups
  tableParser.insertionMode = "IN_COLUMN_GROUP_MODE";

  // Process the current token with the updated parser state
  tableParser._processToken(token);
}

module.exports = handleColgroupTokenInTableParser;