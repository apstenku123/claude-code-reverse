/**
 * Handles end tags in the HTML parsing process, specifically for table-related elements.
 * Determines the appropriate action based on the tag name of the token.
 *
 * @param {Object} parserContext - The parser context, containing open elements and insertion mode logic.
 * @param {Object} token - The token object representing the end tag, must have a tagName property.
 * @returns {void}
 */
function handleTableRelatedEndTag(parserContext, token) {
  const tagName = token.tagName;

  // If the tag is </table>
  if (tagName === i.TABLE) {
    // Only act if a <table> is in table scope
    if (parserContext.openElements.hasInTableScope(i.TABLE)) {
      parserContext.openElements.popUntilTagNamePopped(i.TABLE);
      parserContext._resetInsertionMode();
    }
  }
  // If the tag is </template>
  else if (tagName === i.TEMPLATE) {
    // Delegate to template-specific handler
    handleOAuthClientAuthorization(parserContext, token);
  }
  // If the tag is not one of the special table-related or root elements
  else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
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
    // Temporarily enable foster parenting and process the token in body mode
    temporarilyEnableFosterParentingAndProcessToken(parserContext, token);
  }
}

module.exports = handleTableRelatedEndTag;
