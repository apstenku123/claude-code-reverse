/**
 * Inserts an element into the DOM tree, ensuring any open <createIterableHelper> element is closed if necessary,
 * and switches the tokenizer state to PLAINTEXT mode.
 *
 * @param {Object} parserContext - The parser context, containing open elements stack, tokenizer, and insertion methods.
 * @param {Object} elementToken - The token representing the element to insert.
 * @returns {void}
 */
function insertPlaintextElementAndSwitchMode(parserContext, elementToken) {
  // Check if there is an open <createIterableHelper> element in the current button scope
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the currently open <createIterableHelper> element
    parserContext._closePElement();
  }

  // Insert the new element as an HTML element
  parserContext._insertElement(elementToken, u2.HTML);

  // Switch the tokenizer state to PLAINTEXT mode
  parserContext.tokenizer.state = e1.MODE.PLAINTEXT;
}

module.exports = insertPlaintextElementAndSwitchMode;