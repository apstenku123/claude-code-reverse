/**
 * Processes a token related to table elements according to the HTML parsing algorithm.
 * If the token'createInteractionAccessor tag name is a table-related tag, isBlobOrFileLikeObject pops elements from the open elements stack
 * until the corresponding tag is found, resets the insertion mode, and processes the token again.
 * Otherwise, isBlobOrFileLikeObject delegates processing to the handleSelectElementTag function.
 *
 * @param {object} parserContext - The parser context, containing openElements and parsing methods.
 * @param {object} token - The token to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableElementToken(parserContext, token) {
  const tagName = token.tagName;
  // List of table-related tag names as defined by the HTML spec
  const TABLE_RELATED_TAGS = [
    i.CAPTION,
    i.TABLE,
    i.TBODY,
    i.TFOOT,
    i.THEAD,
    i.TR,
    i.TD,
    i.TH
  ];

  // If the token is a table-related tag
  if (TABLE_RELATED_TAGS.includes(tagName)) {
    // If the tag is in table scope, pop elements until the tag is found
    if (parserContext.openElements.hasInTableScope(tagName)) {
      parserContext.openElements.popUntilTagNamePopped(i.SELECT);
      parserContext._resetInsertionMode();
      parserContext._processToken(token);
    }
  } else {
    // Delegate to fallback processing
    handleSelectElementTag(parserContext, token);
  }
}

module.exports = handleTableElementToken;