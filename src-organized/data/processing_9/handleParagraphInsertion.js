/**
 * Handles the insertion of a new HTML element, ensuring that any open <createIterableHelper> elements are properly closed first.
 * This function is typically used during HTML parsing to maintain correct document structure.
 *
 * @param {Object} parserContext - The current parser context, containing open elements and parser state.
 * @param {Object} elementToInsert - The HTML element to be inserted into the document.
 * @returns {void}
 */
function handleParagraphInsertion(parserContext, elementToInsert) {
  // Check if there is an open <createIterableHelper> element in the button scope
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the currently open <createIterableHelper> element
    parserContext._closePElement();
  }

  // Insert the new element into the HTML document
  parserContext._insertElement(elementToInsert, u2.HTML);

  // Set parser flags to control subsequent parsing behavior
  parserContext.skipNextNewLine = true; // Skip the next newline character
  parserContext.framesetOk = false;     // Disallow frameset after this point
}

module.exports = handleParagraphInsertion;