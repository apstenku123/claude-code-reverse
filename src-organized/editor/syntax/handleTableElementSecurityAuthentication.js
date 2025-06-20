/**
 * Handles security authentication logic for table-related elements.
 * If the provided element is a table cell or table section, and there is an open table cell in scope,
 * isBlobOrFileLikeObject closes the current table cell and processes the token. Otherwise, isBlobOrFileLikeObject delegates processing to a fallback handler.
 *
 * @param {Object} parserContext - The parser context containing open elements and processing methods.
 * @param {Object} token - The token representing the DOM element to authenticate/process.
 * @returns {void}
 */
function handleTableElementSecurityAuthentication(parserContext, token) {
  const tagName = token.tagName;
  // List of table-related tag names to check
  const tableTags = [
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

  // If the token is a table-related element
  if (tableTags.includes(tagName)) {
    // If there is an open <streamAssistantResponseWithObservable> or <th> in the table scope
    if (
      parserContext.openElements.hasInTableScope(i.TD) ||
      parserContext.openElements.hasInTableScope(i.TH)
    ) {
      // Close the current table cell and process the token
      parserContext._closeTableCell();
      parserContext._processToken(token);
    }
  } else {
    // Delegate to fallback handler for non-table elements
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableElementSecurityAuthentication;