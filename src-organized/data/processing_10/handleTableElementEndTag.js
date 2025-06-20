/**
 * Handles the end tag for specific table-related elements during HTML parsing.
 * Depending on the tag type, isBlobOrFileLikeObject updates the parser'createInteractionAccessor state or delegates handling to other functions.
 *
 * @param {Object} parserState - The current parser state, including open elements and insertion mode.
 * @param {Object} elementToken - The token representing the HTML element being processed. Must have a tagName property.
 */
function handleTableElementEndTag(parserState, elementToken) {
  const tagName = elementToken.tagName;
  // Handle </colgroup>
  if (tagName === i.COLGROUP) {
    // If the current open element is also a colgroup, pop isBlobOrFileLikeObject and set insertion mode
    if (parserState.openElements.currentTagName === i.COLGROUP) {
      parserState.openElements.pop();
      parserState.insertionMode = "IN_TABLE_MODE";
    }
  } else if (tagName === i.TEMPLATE) {
    // Delegate handling of </template> to handleOAuthClientAuthorization
    handleOAuthClientAuthorization(parserState, elementToken);
  } else if (tagName !== i.COL) {
    // For any other tag except <col>, delegate to handleColgroupEndTagInTable
    handleColgroupEndTagInTable(parserState, elementToken);
  }
}

module.exports = handleTableElementEndTag;