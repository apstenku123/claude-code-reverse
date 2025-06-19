/**
 * Processes a token and determines if isBlobOrFileLikeObject is a table-related tag. If so, isBlobOrFileLikeObject pops open elements until a SELECT tag is found,
 * resets the insertion mode, and processes the token. Otherwise, isBlobOrFileLikeObject delegates processing to the fallback handler.
 *
 * @param {Object} parserContext - The parser context containing the stack of open elements and processing methods.
 * @param {Object} token - The token object to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableRelatedTagToken(parserContext, token) {
  const tagName = token.tagName;
  // List of table-related tag names as defined in the HTML spec
  const tableRelatedTags = [
    i.CAPTION,
    i.TABLE,
    i.TBODY,
    i.TFOOT,
    i.THEAD,
    i.TR,
    i.TD,
    i.TH
  ];

  // If the token is a table-related tag, handle accordingly
  if (tableRelatedTags.includes(tagName)) {
    // Pop elements from the stack until a SELECT tag is found
    parserContext.openElements.popUntilTagNamePopped(i.SELECT);
    // Reset the insertion mode as per the HTML parsing algorithm
    parserContext._resetInsertionMode();
    // Process the token again in the new context
    parserContext._processToken(token);
  } else {
    // For non-table-related tags, delegate to the fallback handler
    handleHtmlElementInsertion(parserContext, token);
  }
}

module.exports = handleTableRelatedTagToken;