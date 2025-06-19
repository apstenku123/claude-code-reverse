/**
 * Handles tokens related to table row context during HTML parsing.
 *
 * This function processes a token within the context of table row elements (such as <tr>, <table>, <tbody>, <tfoot>, <thead>)
 * according to the HTML parsing algorithm. It manipulates the parser'createInteractionAccessor open elements stack and insertion mode as needed,
 * and delegates token processing or error handling as appropriate.
 *
 * @param {object} parserContext - The parser context, containing openElements stack and parser state.
 * @param {object} token - The current token being processed. Should have a tagName property.
 * @returns {void}
 */
function handleTableRowContextToken(parserContext, token) {
  const tagName = token.tagName;
  // Handle <tr> end tag
  if (tagName === i.TR) {
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
    }
  }
  // Handle <table> end tag
  else if (tagName === i.TABLE) {
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      parserContext._processToken(token);
    }
  }
  // Handle <tbody>, <tfoot>, <thead> end tags
  else if (
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    if (
      parserContext.openElements.hasInTableScope(tagName) ||
      parserContext.openElements.hasInTableScope(i.TR)
    ) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      parserContext._processToken(token);
    }
  }
  // Handle all other end tags (error cases)
  else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP ||
    tagName !== i.HTML &&
    tagName !== i.TD &&
    tagName !== i.TH
  ) {
    // Delegate to parse error handler
    handleTableRelatedEndTag(parserContext, token);
  }
}

module.exports = handleTableRowContextToken;