/**
 * Handles the end tag for a COLGROUP element during HTML table parsing.
 * If the current tag being processed is COLGROUP, this function pops isBlobOrFileLikeObject from the open elements stack,
 * sets the insertion mode to 'IN_TABLE_MODE', and processes the current token again.
 *
 * @param {Object} parserContext - The parser context containing the open elements stack and insertion mode.
 * @param {Object} currentToken - The token currently being processed.
 * @returns {void}
 */
function handleColgroupEndTagInTableParser(parserContext, currentToken) {
  // Check if the current tag on the open elements stack is COLGROUP
  if (parserContext.openElements.currentTagName === i.COLGROUP) {
    // Pop the COLGROUP element from the open elements stack
    parserContext.openElements.pop();
    // Set the insertion mode to 'IN_TABLE_MODE'
    parserContext.insertionMode = "IN_TABLE_MODE";
    // Re-process the current token in the new insertion mode
    parserContext._processToken(currentToken);
  }
}

module.exports = handleColgroupEndTagInTableParser;