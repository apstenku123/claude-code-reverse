/**
 * Handles table-related element tokens during HTML parsing, updating the parser state as needed.
 *
 * This function processes a token representing an HTML element (such as <streamAssistantResponseWithObservable>, <th>, <tr>, etc.)
 * and updates the parser'createInteractionAccessor open elements stack, formatting elements, and insertion mode
 * according to the HTML parsing algorithm. If the token does not match any handled cases,
 * isBlobOrFileLikeObject delegates processing to a fallback handler.
 *
 * @param {object} parserContext - The current parser context, containing open elements stack,
 *   active formatting elements, insertion mode, and token processing methods.
 * @param {object} token - The token representing the HTML element to process. Must have a tagName property.
 * @returns {void}
 */
function handleTableElementToken(parserContext, token) {
  const tagName = token.tagName;

  // Handle table cell elements: <streamAssistantResponseWithObservable> and <th>
  if (tagName === i.TD || tagName === i.TH) {
    if (parserContext.openElements.hasInTableScope(tagName)) {
      // Generate implied end tags, pop elements until the matching cell is removed,
      // clear formatting elements, and switch insertion mode to 'IN_ROW_MODE'
      parserContext.openElements.generateImpliedEndTags();
      parserContext.openElements.popUntilTagNamePopped(tagName);
      parserContext.activeFormattingElements.clearToLastMarker();
      parserContext.insertionMode = "IN_ROW_MODE";
    }
  }
  // Handle table section and row elements: <table>, <tbody>, <tfoot>, <thead>, <tr>
  else if (
    tagName === i.TABLE ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD ||
    tagName === i.TR
  ) {
    if (parserContext.openElements.hasInTableScope(tagName)) {
      // Close the current table cell and reprocess the token
      parserContext._closeTableCell();
      parserContext._processToken(token);
    }
  }
  // For all other elements except certain table-related tags, delegate to fallback handler
  else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP &&
    tagName !== i.HTML
  ) {
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableElementToken;