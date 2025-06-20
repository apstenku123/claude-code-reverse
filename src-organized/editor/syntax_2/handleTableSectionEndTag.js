/**
 * Handles end tags for table section elements (TR, TABLE, TBODY, TFOOT, THEAD, etc.)
 * during HTML parsing, updating the parser state and processing tokens as needed.
 *
 * @param {Object} parserContext - The parser context containing open elements stack and state.
 * @param {Object} token - The current token being processed (should have a tagName property).
 * @returns {void}
 */
function handleTableSectionEndTag(parserContext, token) {
  const tagName = token.tagName;
  // Handle </tr>
  if (tagName === i.TR) {
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
    }
  }
  // Handle </table>
  else if (tagName === i.TABLE) {
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      parserContext._processToken(token);
    }
  }
  // Handle </tbody>, </tfoot>, </thead>
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
  // Handle all other end tags not explicitly handled above
  else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP ||
    tagName !== i.HTML &&
    tagName !== i.TD &&
    tagName !== i.TH
  ) {
    // Delegate to generic end tag processing
    handleTableRelatedEndTag(parserContext, token);
  }
}

module.exports = handleTableSectionEndTag;