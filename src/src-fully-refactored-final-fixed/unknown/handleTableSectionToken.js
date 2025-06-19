/**
 * Processes a token within the context of HTML table section elements.
 * If the token'createInteractionAccessor tagName matches a table section or cell element (e.g., CAPTION, TABLE, TBODY, TFOOT, THEAD, TR, TD, TH),
 * isBlobOrFileLikeObject pops elements from the open elements stack up to a SELECT tag, resets the insertion mode, and processes the token again.
 * Otherwise, isBlobOrFileLikeObject delegates processing to the fallback handler.
 *
 * @param {object} parserContext - The parser context containing open elements and processing methods.
 * @param {object} token - The token object to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableSectionToken(parserContext, token) {
  // List of tag names that require special handling in table contexts
  const tableSectionTagNames = [
    i.CAPTION,
    i.TABLE,
    i.TBODY,
    i.TFOOT,
    i.THEAD,
    i.TR,
    i.TD,
    i.TH
  ];

  const tokenTagName = token.tagName;

  // If the token is a table section or cell element, handle accordingly
  if (tableSectionTagNames.includes(tokenTagName)) {
    // Pop elements from the open elements stack until a SELECT tag is popped
    parserContext.openElements.popUntilTagNamePopped(i.SELECT);
    // Reset the insertion mode as per the HTML parsing algorithm
    parserContext._resetInsertionMode();
    // Re-process the current token
    parserContext._processToken(token);
  } else {
    // For all other tokens, delegate to the fallback handler
    handleHtmlElementInsertion(parserContext, token);
  }
}

module.exports = handleTableSectionToken;