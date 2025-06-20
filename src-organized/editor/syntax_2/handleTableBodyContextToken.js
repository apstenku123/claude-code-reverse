/**
 * Handles tokens encountered within the table body context during HTML parsing.
 * Determines the correct action based on the tag name of the token, updating the parser state and open elements stack as needed.
 *
 * @param {object} parserContext - The current parser context, containing open elements and parser state.
 * @param {object} token - The token (DOM element) to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableBodyContextToken(parserContext, token) {
  const tagName = token.tagName;

  // If the token is a <tr> element
  if (tagName === i.TR) {
    // Clear elements back to the table body context, insert the <tr>, and switch to row mode
    parserContext.openElements.clearBackToTableBodyContext();
    parserContext._insertElement(token, u2.HTML);
    parserContext.insertionMode = "IN_ROW_MODE";
    return;
  }

  // If the token is a <th> or <streamAssistantResponseWithObservable> element
  if (tagName === i.TH || tagName === i.TD) {
    // Clear elements back to the table body context, insert a fake <tr>, switch to row mode, then process the token
    parserContext.openElements.clearBackToTableBodyContext();
    parserContext._insertFakeElement(i.TR);
    parserContext.insertionMode = "IN_ROW_MODE";
    parserContext._processToken(token);
    return;
  }

  // If the token is one of the table section or column elements
  if (
    tagName === i.CAPTION ||
    tagName === i.COL ||
    tagName === i.COLGROUP ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    // If the table body context is present in table scope, clear back to isBlobOrFileLikeObject, pop isBlobOrFileLikeObject, switch to table mode, and process the token
    if (parserContext.openElements.hasTableBodyContextInTableScope()) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
      parserContext._processToken(token);
    }
    return;
  }

  // For all other tokens, delegate to the generic table-related element handler
  processTableRelatedElement(parserContext, token);
}

module.exports = handleTableBodyContextToken;