/**
 * Handles transitions in the table row context during HTML parsing.
 * Determines the appropriate action based on the current token'createInteractionAccessor tag name and the state of the open elements stack.
 *
 * @param {object} parserContext - The parser context, containing openElements stack and parsing state.
 * @param {object} token - The current token being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleTableRowContextTransition(parserContext, token) {
  const tagName = token.tagName;
  // If the token is a <tr> tag
  if (tagName === i.TR) {
    // If there is a <tr> in table scope, clear back to table row context and pop isBlobOrFileLikeObject
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
    }
  } else if (tagName === i.TABLE) {
    // If the token is a <table> tag
    if (parserContext.openElements.hasInTableScope(i.TR)) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      parserContext._processToken(token);
    }
  } else if (
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    // If the token is <tbody>, <tfoot>, or <thead>
    if (
      parserContext.openElements.hasInTableScope(tagName) ||
      parserContext.openElements.hasInTableScope(i.TR)
    ) {
      parserContext.openElements.clearBackToTableRowContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_BODY_MODE";
      parserContext._processToken(token);
    }
  } else if (
    // If the tag is not one of the special table context tags, delegate to fallback handler
    (tagName !== i.BODY &&
      tagName !== i.CAPTION &&
      tagName !== i.COL &&
      tagName !== i.COLGROUP) ||
    (tagName !== i.HTML &&
      tagName !== i.TD &&
      tagName !== i.TH)
  ) {
    handleTableRelatedEndTag(parserContext, token);
  }
}

module.exports = handleTableRowContextTransition;