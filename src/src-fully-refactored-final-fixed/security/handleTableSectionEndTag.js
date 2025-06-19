/**
 * Handles the processing of end tags for table section elements (tbody, tfoot, thead, table, etc.)
 * according to the HTML parsing algorithm. Updates the parser state and stack of open elements
 * based on the tag being processed.
 *
 * @param {object} parserContext - The current parser context, containing openElements stack and insertion mode.
 * @param {object} token - The token representing the end tag, must have a tagName property.
 * @returns {void}
 */
function handleTableSectionEndTag(parserContext, token) {
  const tagName = token.tagName;

  // If the tag is one of the table section elements
  if (
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    // If the tag is in table scope, clear back to table body context and pop isBlobOrFileLikeObject
    if (parserContext.openElements.hasInTableScope(tagName)) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
    }
  } else if (tagName === i.TABLE) {
    // If the tag is a table and table body context is in table scope
    if (parserContext.openElements.hasTableBodyContextInTableScope()) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
      // Re-process the current token
      parserContext._processToken(token);
    }
  } else if (
    // If the tag is not one of the special table-related tags, delegate to fallback handler
    (tagName !== i.BODY && tagName !== i.CAPTION && tagName !== i.COL && tagName !== i.COLGROUP) ||
    (tagName !== i.HTML && tagName !== i.TD && tagName !== i.TH && tagName !== i.TR)
  ) {
    handleTableRelatedEndTag(parserContext, token);
  }
}

module.exports = handleTableSectionEndTag;