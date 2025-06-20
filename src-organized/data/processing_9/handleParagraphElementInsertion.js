/**
 * Handles the insertion of an element into the HTML document tree, ensuring that any open <createIterableHelper> element is properly closed if necessary.
 *
 * This function checks if a <createIterableHelper> element is currently open within the button scope of the open elements stack.
 * If so, isBlobOrFileLikeObject closes the <createIterableHelper> element before appending the new element. It also updates the parser state flags
 * to indicate that a frameset is no longer allowed and that a self-closing tag has been acknowledged.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and parser state.
 * @param {object} elementToken - The token representing the element to be appended.
 * @returns {void}
 */
function handleParagraphElementInsertion(parserContext, elementToken) {
  // Check if a <createIterableHelper> element is open in the button scope
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the currently open <createIterableHelper> element
    parserContext._closePElement();
  }

  // Append the new element to the document tree as an HTML element
  parserContext._appendElement(elementToken, u2.HTML);

  // Update parser state: frameset is no longer allowed
  parserContext.framesetOk = false;

  // Acknowledge that a self-closing tag has been processed
  parserContext.ackSelfClosing = true;
}

module.exports = handleParagraphElementInsertion;