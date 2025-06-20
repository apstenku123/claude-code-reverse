/**
 * Resets the open elements stack to the table context, inserts a fake COLGROUP element,
 * sets the insertion mode to 'IN_COLUMN_GROUP_MODE', and processes the given token.
 *
 * @param {Object} parserContext - The parser context object that manages the open elements stack and insertion modes.
 * @param {Object} token - The token to be processed after resetting the context.
 * @returns {void}
 */
function resetTableContextAndProcessToken(parserContext, token) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert a fake COLGROUP element into the stack
  parserContext._insertFakeElement(i.COLGROUP);

  // Set the insertion mode to 'IN_COLUMN_GROUP_MODE'
  parserContext.insertionMode = "IN_COLUMN_GROUP_MODE";

  // Process the provided token in the new context
  parserContext._processToken(token);
}

module.exports = resetTableContextAndProcessToken;