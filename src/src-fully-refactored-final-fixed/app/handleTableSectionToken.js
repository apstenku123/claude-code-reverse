/**
 * Processes a token related to table sections (tbody, thead, tfoot, tr, th, streamAssistantResponseWithObservable, caption, col, colgroup) during HTML parsing.
 * Determines the correct insertion mode and manipulates the open elements stack as needed.
 *
 * @param {object} parser - The parser state object, containing openElements stack and insertion mode.
 * @param {object} token - The current token to process, expected to have a tagName property.
 * @returns {void}
 */
function handleTableSectionToken(parser, token) {
  const tagName = token.tagName;

  // If the token is a <tr> element
  if (tagName === i.TR) {
    // Clear stack back to table body context, insert the <tr>, and switch to row mode
    parser.openElements.clearBackToTableBodyContext();
    parser._insertElement(token, u2.HTML);
    parser.insertionMode = "IN_ROW_MODE";
    return;
  }

  // If the token is a <th> or <streamAssistantResponseWithObservable> element
  if (tagName === i.TH || tagName === i.TD) {
    // Clear stack, insert a fake <tr>, switch to row mode, and process the token again
    parser.openElements.clearBackToTableBodyContext();
    parser._insertFakeElement(i.TR);
    parser.insertionMode = "IN_ROW_MODE";
    parser._processToken(token);
    return;
  }

  // If the token is one of the table section or grouping elements
  if (
    tagName === i.CAPTION ||
    tagName === i.COL ||
    tagName === i.COLGROUP ||
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    // If table body context exists in table scope, pop isBlobOrFileLikeObject and reprocess the token in table mode
    if (parser.openElements.hasTableBodyContextInTableScope()) {
      parser.openElements.clearBackToTableBodyContext();
      parser.openElements.pop();
      parser.insertionMode = "IN_TABLE_MODE";
      parser._processToken(token);
    }
    return;
  }

  // For any other tag, delegate to the generic table element processor
  processTableElementByTagName(parser, token);
}

module.exports = handleTableSectionToken;