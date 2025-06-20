/**
 * Handles processing of table-related tokens, specifically CAPTION and TABLE elements,
 * within the context of an HTML parser'createInteractionAccessor security/authentication flow. If the token is not a table-related element,
 * delegates to a fallback handler.
 *
 * @param {Object} parserContext - The parser context, containing openElements, activeFormattingElements, and insertionMode.
 * @param {Object} token - The token object to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableCaptionOrFallback(parserContext, token) {
  const tagName = token.tagName;
  // Check if the token is a CAPTION or TABLE element
  if (tagName === i.CAPTION || tagName === i.TABLE) {
    // Only proceed if a CAPTION is in table scope
    if (parserContext.openElements.hasInTableScope(i.CAPTION)) {
      // Generate implied end tags and pop elements up to CAPTION
      parserContext.openElements.generateImpliedEndTags();
      parserContext.openElements.popUntilTagNamePopped(i.CAPTION);
      // Clear active formatting elements up to the last marker
      parserContext.activeFormattingElements.clearToLastMarker();
      // Set the insertion mode to IN_TABLE_MODE
      parserContext.insertionMode = "IN_TABLE_MODE";
      // If the current token is a TABLE, reprocess the token
      if (tagName === i.TABLE) {
        parserContext._processToken(token);
      }
    }
  } else if (
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
    // For all other tags not listed above, delegate to the fallback handler
    handleHtmlElementByTagName(parserContext, token);
  }
}

module.exports = handleTableCaptionOrFallback;