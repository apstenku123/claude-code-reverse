/**
 * Handles end tag tokens for CAPTION and TABLE elements within a table context during HTML parsing.
 * Ensures proper scope and stack management for table-related elements, and delegates processing for other tags.
 *
 * @param {Object} parserContext - The parser context containing open elements, formatting elements, and insertion mode.
 * @param {Object} token - The token object representing the end tag, must have a tagName property.
 * @returns {void}
 */
function handleTableCaptionEndTag(parserContext, token) {
  const tagName = token.tagName;

  // Check if the tag is CAPTION or TABLE
  if (tagName === i.CAPTION || tagName === i.TABLE) {
    // Only proceed if there is a CAPTION element in table scope
    if (parserContext.openElements.hasInTableScope(i.CAPTION)) {
      // Generate implied end tags before popping CAPTION
      parserContext.openElements.generateImpliedEndTags();
      // Pop elements until CAPTION is removed from the stack
      parserContext.openElements.popUntilTagNamePopped(i.CAPTION);
      // Clear active formatting elements up to the last marker
      parserContext.activeFormattingElements.clearToLastMarker();
      // Switch insertion mode back to IN_TABLE_MODE
      parserContext.insertionMode = "IN_TABLE_MODE";
      // If the end tag is TABLE, reprocess the token in the new insertion mode
      if (tagName === i.TABLE) {
        parserContext._processToken(token);
      }
    }
  } else if (
    // If the tag is NOT one of the table section or cell elements, delegate to handleHtmlElementByTagName
    tagName !== i.BODY &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP &&
    tagName !== i.HTML &&
    tagName !== i.TBODY &&
    tagName !== i.TD &&
    tagName !== i.TFOOT &&
    tagName !== i.TH &&
    tagName !== i.THEAD &&
    tagName !== i.TR
  ) {
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableCaptionEndTag;