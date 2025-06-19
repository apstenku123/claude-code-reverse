/**
 * Inserts an element into the document in table mode, handling quirks mode and paragraph closure as needed.
 *
 * @param {Object} parserContext - The parser context containing document, treeAdapter, openElements, and related methods.
 * @param {Object} elementToken - The element token to be inserted into the document.
 * @returns {void}
 *
 * If the document is not in quirks mode and a <createIterableHelper> element is in button scope, closes the <createIterableHelper> element before inserting the new element.
 * Then inserts the element as an HTML element, sets framesetOk to false, and updates the insertion mode to 'IN_TABLE_MODE'.
 */
function insertElementInTableMode(parserContext, elementToken) {
  // Check if the document is NOT in quirks mode
  const isQuirksMode = parserContext.treeAdapter.getDocumentMode(parserContext.document) === yj.DOCUMENT_MODE.QUIRKS;

  // If not in quirks mode and a <createIterableHelper> element is in button scope, close the <createIterableHelper> element
  if (!isQuirksMode && parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Insert the new element as an HTML element
  parserContext._insertElement(elementToken, u2.HTML);

  // Set framesetOk to false as per HTML parsing rules
  parserContext.framesetOk = false;

  // Update the insertion mode to 'IN_TABLE_MODE'
  parserContext.insertionMode = "IN_TABLE_MODE";
}

module.exports = insertElementInTableMode;