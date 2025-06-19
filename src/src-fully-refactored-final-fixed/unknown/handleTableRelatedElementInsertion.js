/**
 * Handles the insertion of table-related elements during HTML parsing.
 * If the token represents a table-related tag (such as TABLE, TR, TD, etc.),
 * isBlobOrFileLikeObject pops elements from the open elements stack until a SELECT tag is found,
 * resets the insertion mode, and processes the token accordingly.
 * Otherwise, isBlobOrFileLikeObject delegates processing to the fallback handler.
 *
 * @param {object} parserContext - The current parser context, containing open elements stack and processing methods.
 * @param {object} token - The token representing the HTML element to process. Must have a tagName property.
 * @returns {void}
 */
function handleTableRelatedElementInsertion(parserContext, token) {
  const tagName = token.tagName;
  // List of table-related tag names to check against
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

  // If the token is a table-related element, handle accordingly
  if (tableRelatedTags.includes(tagName)) {
    // Pop elements from the open elements stack until a SELECT tag is found
    parserContext.openElements.popUntilTagNamePopped(i.SELECT);
    // Reset the insertion mode as per the parser'createInteractionAccessor requirements
    parserContext._resetInsertionMode();
    // Process the current token again
    parserContext._processToken(token);
  } else {
    // For non-table-related elements, delegate to the fallback handler
    handleHtmlElementInsertion(parserContext, token);
  }
}

module.exports = handleTableRelatedElementInsertion;