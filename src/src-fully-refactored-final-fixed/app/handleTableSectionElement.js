/**
 * Processes table section elements during HTML parsing, handling insertion and context switching
 * according to the tag name of the provided token. This function manages the parser'createInteractionAccessor open elements stack
 * and insertion mode for table-related tags, and delegates to a fallback handler for non-table-section elements.
 *
 * @param {object} parserContext - The parser context, containing openElements stack and parser state methods.
 * @param {object} token - The token representing a DOM element, with a tagName property.
 * @returns {void}
 */
function handleTableSectionElement(parserContext, token) {
  const tagName = token.tagName;
  const tagNames = parserContext.constants; // Assuming 'i' is a constants object for tag names

  // Handle <tr> tag: clear context, insert element, switch to row mode
  if (tagName === tagNames.TR) {
    parserContext.openElements.clearBackToTableBodyContext();
    parserContext._insertElement(token, parserContext.HTML_NAMESPACE);
    parserContext.insertionMode = "IN_ROW_MODE";
    return;
  }

  // Handle <th> or <streamAssistantResponseWithObservable>: clear context, insert fake <tr>, switch to row mode, process token again
  if (tagName === tagNames.TH || tagName === tagNames.TD) {
    parserContext.openElements.clearBackToTableBodyContext();
    parserContext._insertFakeElement(tagNames.TR);
    parserContext.insertionMode = "IN_ROW_MODE";
    parserContext._processToken(token);
    return;
  }

  // Handle table section and grouping tags
  if (
    tagName === tagNames.CAPTION ||
    tagName === tagNames.COL ||
    tagName === tagNames.COLGROUP ||
    tagName === tagNames.TBODY ||
    tagName === tagNames.TFOOT ||
    tagName === tagNames.THEAD
  ) {
    // Only act if a table body context exists in table scope
    if (parserContext.openElements.hasTableBodyContextInTableScope()) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
      parserContext._processToken(token);
    }
    return;
  }

  // Fallback: delegate to the generic table-related element handler
  processTableRelatedElement(parserContext, token);
}

module.exports = handleTableSectionElement;