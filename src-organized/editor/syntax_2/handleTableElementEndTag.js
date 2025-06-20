/**
 * Handles the end tag for table-related elements during HTML parsing.
 * Determines the appropriate action based on the tag name of the current token,
 * manipulating the open elements stack and formatting elements as needed.
 *
 * @param {Object} parserContext - The current parser context, containing stacks and state.
 * @param {Object} token - The current token being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleTableElementEndTag(parserContext, token) {
  const tagName = token.tagName;

  // If the tag is a table cell (TD or TH)
  if (tagName === i.TD || tagName === i.TH) {
    // Only process if the tag is in table scope
    if (parserContext.openElements.hasInTableScope(tagName)) {
      // Generate implied end tags, pop elements until the cell is popped,
      // clear formatting elements, and set insertion mode to row mode
      parserContext.openElements.generateImpliedEndTags();
      parserContext.openElements.popUntilTagNamePopped(tagName);
      parserContext.activeFormattingElements.clearToLastMarker();
      parserContext.insertionMode = "IN_ROW_MODE";
    }
  }
  // If the tag is a table section or row (TABLE, TBODY, TFOOT, THEAD, TR)
  else if (
    tagName === i.TABLE ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD ||
    tagName === i.TR
  ) {
    // Only process if the tag is in table scope
    if (parserContext.openElements.hasInTableScope(tagName)) {
      // Close the current table cell and process the token again
      parserContext._closeTableCell();
      parserContext._processToken(token);
    }
  }
  // For all other tags except BODY, CAPTION, COL, COLGROUP, HTML
  else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP &&
    tagName !== i.HTML
  ) {
    // Delegate processing to the fallback handler
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableElementEndTag;