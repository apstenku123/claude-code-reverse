/**
 * Handles the insertion of an element into the DOM tree in the context of an HTML table.
 * Ensures proper closing of <createIterableHelper> elements if necessary, inserts the new element, and updates parser state.
 *
 * @param {Object} parserContext - The parser context containing the tree adapter, document, open elements stack, and parser state.
 * @param {Object} elementToken - The token representing the element to be inserted.
 * @returns {void}
 */
function handleTableElementInsertion(parserContext, elementToken) {
  // Check if the document is NOT in quirks mode and if a <createIterableHelper> element is in button scope
  const isNotQuirksMode = parserContext.treeAdapter.getDocumentMode(parserContext.document) !== yj.DOCUMENT_MODE.QUIRKS;
  const hasPElementInButtonScope = parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting);

  if (isNotQuirksMode && hasPElementInButtonScope) {
    // Close the <createIterableHelper> element if required by the parsing rules
    parserContext._closePElement();
  }

  // Insert the new element into the DOM tree in the HTML namespace
  parserContext._insertElement(elementToken, u2.HTML);

  // Update parser state: frameset is no longer allowed and switch insertion mode
  parserContext.framesetOk = false;
  parserContext.insertionMode = "IN_TABLE_MODE";
}

module.exports = handleTableElementInsertion;