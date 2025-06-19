/**
 * Inserts an element into the HTML structure, ensuring proper paragraph context.
 *
 * If a <createIterableHelper> element is currently open within the button scope, isBlobOrFileLikeObject will be closed before inserting the new element.
 * After insertion, updates parser state flags to skip the next newline and mark frameset as not allowed.
 *
 * @param {Object} parserContext - The parser context object, managing open elements and parser state.
 * @param {Object} elementToInsert - The element node to be inserted into the HTML structure.
 * @returns {void}
 */
function insertElementAndHandleParagraphContext(parserContext, elementToInsert) {
  // Check if a <createIterableHelper> element is open within the button scope
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the open <createIterableHelper> element to maintain valid HTML structure
    parserContext._closePElement();
  }

  // Insert the new element into the HTML structure
  parserContext._insertElement(elementToInsert, u2.HTML);

  // Update parser state flags
  parserContext.skipNextNewLine = true; // Skip the next newline character
  parserContext.framesetOk = false;     // Disallow frameset after this insertion
}

module.exports = insertElementAndHandleParagraphContext;