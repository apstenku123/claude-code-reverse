/**
 * Resets the open elements stack back to the table context, inserts a fake TBODY element,
 * sets the insertion mode to 'IN_TABLE_BODY_MODE', and processes the given token.
 *
 * @param {Object} parserContext - The parser context containing open elements and processing methods.
 * @param {Object} token - The token to be processed after resetting the context.
 * @returns {void}
 */
function resetTableBodyContextAndProcessToken(parserContext, token) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert a fake TBODY element into the stack
  parserContext._insertFakeElement(i.TBODY);

  // Set the insertion mode to 'IN_TABLE_BODY_MODE'
  parserContext.insertionMode = "IN_TABLE_BODY_MODE";

  // Process the provided token in the new context
  parserContext._processToken(token);
}

module.exports = resetTableBodyContextAndProcessToken;