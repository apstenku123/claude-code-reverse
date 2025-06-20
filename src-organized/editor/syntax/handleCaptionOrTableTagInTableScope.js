/**
 * Handles the processing of CAPTION and TABLE tags within the table scope during HTML parsing.
 * If the current token is a CAPTION or TABLE tag and a CAPTION is present in the table scope,
 * isBlobOrFileLikeObject generates implied end tags, pops elements until CAPTION is removed, clears formatting elements,
 * and sets the insertion mode. If the tag is TABLE, isBlobOrFileLikeObject re-processes the token. For other tags,
 * isBlobOrFileLikeObject delegates processing to the handleHtmlElementByTagName handler.
 *
 * @param {Object} parserContext - The parser context, containing open elements, formatting elements, and insertion mode.
 * @param {Object} token - The current token being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleCaptionOrTableTagInTableScope(parserContext, token) {
  const tagName = token.tagName;

  // Check if the tag is CAPTION or TABLE
  if (tagName === i.CAPTION || tagName === i.TABLE) {
    // Only proceed if there is a CAPTION element in the table scope
    if (parserContext.openElements.hasInTableScope(i.CAPTION)) {
      // Generate implied end tags as per the HTML parsing algorithm
      parserContext.openElements.generateImpliedEndTags();
      // Pop elements until CAPTION is removed from the stack
      parserContext.openElements.popUntilTagNamePopped(i.CAPTION);
      // Clear active formatting elements up to the last marker
      parserContext.activeFormattingElements.clearToLastMarker();
      // Set the insertion mode to IN_TABLE_MODE
      parserContext.insertionMode = "IN_TABLE_MODE";
      // If the tag is TABLE, re-process the current token
      if (tagName === i.TABLE) {
        parserContext._processToken(token);
      }
    }
  } else if (
    // If the tag is not one of the table sectioning or cell tags, delegate to handleHtmlElementByTagName
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

module.exports = handleCaptionOrTableTagInTableScope;