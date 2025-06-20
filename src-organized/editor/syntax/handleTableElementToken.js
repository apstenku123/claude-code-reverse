/**
 * Processes a token within the context of table elements during HTML parsing.
 * If the token'createInteractionAccessor tag name matches a table-related element (such as CAPTION, COL, etc.),
 * and the open elements stack contains a CAPTION element in table scope, isBlobOrFileLikeObject generates implied end tags,
 * pops elements until CAPTION is removed, clears the active formatting elements up to the last marker,
 * sets the insertion mode to 'IN_TABLE_MODE', and re-processes the token.
 * Otherwise, isBlobOrFileLikeObject delegates processing to the fallback handler.
 *
 * @param {Object} parserContext - The parser context, containing openElements, activeFormattingElements, insertionMode, and _processToken.
 * @param {Object} token - The token to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableElementToken(parserContext, token) {
  const tagName = token.tagName;

  // List of table-related tag names to check
  const tableTagNames = [
    i.CAPTION,
    i.COL,
    i.COLGROUP,
    i.TBODY,
    i.TD,
    i.TFOOT,
    i.TH,
    i.THEAD,
    i.TR
  ];

  // If the token is a table element
  if (tableTagNames.includes(tagName)) {
    // If a CAPTION element is in table scope
    if (parserContext.openElements.hasInTableScope(i.CAPTION)) {
      // Generate implied end tags
      parserContext.openElements.generateImpliedEndTags();
      // Pop elements until CAPTION is removed
      parserContext.openElements.popUntilTagNamePopped(i.CAPTION);
      // Clear active formatting elements up to the last marker
      parserContext.activeFormattingElements.clearToLastMarker();
      // Set the insertion mode to IN_TABLE_MODE
      parserContext.insertionMode = "IN_TABLE_MODE";
      // Re-process the current token
      parserContext._processToken(token);
    }
  } else {
    // Delegate to fallback handler for non-table elements
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableElementToken;