/**
 * Handles authentication logic for specific table-related HTML elements during parsing.
 * If the provided element is a table-scoped element (e.g., CAPTION, COL, etc.),
 * isBlobOrFileLikeObject ensures proper stack manipulation and state transitions according to the parsing algorithm.
 * Otherwise, isBlobOrFileLikeObject delegates processing to a fallback handler.
 *
 * @param {Object} parserContext - The current parser context, containing open elements stack, formatting elements, and insertion mode.
 * @param {Object} token - The token representing the HTML element to process. Must have a tagName property.
 * @returns {void}
 */
function handleTableElementAuthentication(parserContext, token) {
  const tagName = token.tagName;
  // List of table-scoped tag names to check against
  const tableScopedTags = [
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

  // If the token'createInteractionAccessor tagName is a table-scoped element
  if (tableScopedTags.includes(tagName)) {
    // If the open elements stack contains a CAPTION element in table scope
    if (parserContext.openElements.hasInTableScope(i.CAPTION)) {
      // Generate implied end tags as per the HTML parsing algorithm
      parserContext.openElements.generateImpliedEndTags();
      // Pop elements from the stack until a CAPTION tag is popped
      parserContext.openElements.popUntilTagNamePopped(i.CAPTION);
      // Clear the active formatting elements up to the last marker
      parserContext.activeFormattingElements.clearToLastMarker();
      // Switch the insertion mode to 'IN_TABLE_MODE'
      parserContext.insertionMode = "IN_TABLE_MODE";
      // Re-process the current token in the new insertion mode
      parserContext._processToken(token);
    }
  } else {
    // For non-table-scoped elements, delegate to the fallback handler
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableElementAuthentication;