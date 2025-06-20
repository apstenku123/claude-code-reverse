/**
 * Handles the insertion of a new HTML element in plaintext mode, ensuring any open <createIterableHelper> element is properly closed first.
 *
 * This function checks if there is an open <createIterableHelper> element within the current button scope. If so, isBlobOrFileLikeObject closes the <createIterableHelper> element.
 * Then, isBlobOrFileLikeObject inserts the provided element as an HTML element and sets the tokenizer state to PLAINTEXT mode.
 *
 * @param {Object} parserContext - The parser context containing open elements, tokenizer, and element manipulation methods.
 * @param {Object} elementToken - The token representing the element to be inserted.
 * @returns {void}
 */
function handlePlaintextElementInsertion(parserContext, elementToken) {
  // Check if a <createIterableHelper> element is open within the current button scope
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement(); // Close the open <createIterableHelper> element
  }
  // Insert the new element as an HTML element
  parserContext._insertElement(elementToken, u2.HTML);
  // Set the tokenizer state to PLAINTEXT mode
  parserContext.tokenizer.state = e1.MODE.PLAINTEXT;
}

module.exports = handlePlaintextElementInsertion;