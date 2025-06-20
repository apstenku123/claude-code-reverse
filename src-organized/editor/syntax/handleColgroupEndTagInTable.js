/**
 * Handles the end tag for a <colgroup> element when parsing an HTML table.
 * If the current open element is a COLGROUP, isBlobOrFileLikeObject pops isBlobOrFileLikeObject from the stack,
 * sets the insertion mode to 'IN_TABLE_MODE', and processes the current token.
 *
 * @param {Object} parserContext - The parser context containing the open elements stack and insertion mode.
 * @param {Object} token - The current token being processed.
 * @returns {void}
 */
function handleColgroupEndTagInTable(parserContext, token) {
  // Check if the current open element is a COLGROUP
  if (parserContext.openElements.currentTagName === i.COLGROUP) {
    // Remove the COLGROUP element from the stack
    parserContext.openElements.pop();
    // Set the insertion mode to 'IN_TABLE_MODE'
    parserContext.insertionMode = "IN_TABLE_MODE";
    // Process the current token again with the updated context
    parserContext._processToken(token);
  }
}

module.exports = handleColgroupEndTagInTable;