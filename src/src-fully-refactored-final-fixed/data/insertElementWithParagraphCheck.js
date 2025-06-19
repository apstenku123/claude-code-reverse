/**
 * Inserts an element into the DOM, ensuring that any open <createIterableHelper> elements in button scope are properly closed first.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation, containing openElements, _closePElement, and _insertElement methods.
 * @param {Object} elementToInsert - The element node to be inserted into the DOM.
 * @returns {void}
 */
function insertElementWithParagraphCheck(domHandler, elementToInsert) {
  // Check if there is an open <createIterableHelper> element in the button scope
  if (domHandler.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the open <createIterableHelper> element before inserting the new element
    domHandler._closePElement();
  }
  // Insert the new element into the DOM with the context of HTML
  domHandler._insertElement(elementToInsert, u2.HTML);
}

module.exports = insertElementWithParagraphCheck;