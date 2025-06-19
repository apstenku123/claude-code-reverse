/**
 * Processes a token related to table elements in the context of security authentication.
 * If the token corresponds to a table cell or header, ensures proper closure and processing.
 * Otherwise, delegates processing to a fallback handler.
 *
 * @param {Object} authenticationContext - The authentication context, containing open elements and processing methods.
 * @param {Object} token - The token to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableElementSecurity(authenticationContext, token) {
  const tagName = token.tagName;

  // List of table-related tag names that require special handling
  const tableCellTags = [
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

  // Check if the token is a table cell or header
  if (tableCellTags.includes(tagName)) {
    // If a table cell (TD or TH) is open in table scope, close isBlobOrFileLikeObject and process the token
    if (
      authenticationContext.openElements.hasInTableScope(i.TD) ||
      authenticationContext.openElements.hasInTableScope(i.TH)
    ) {
      authenticationContext._closeTableCell();
      authenticationContext._processToken(token);
    }
  } else {
    // For non-table cell elements, delegate to the fallback handler
    handleHtmlElementByTagName(authenticationContext, token);
  }
}

module.exports = handleTableElementSecurity;