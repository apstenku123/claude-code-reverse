/**
 * Inserts an element into the DOM tree, ensuring that any open <createIterableHelper> (paragraph) element
 * in the current button scope is properly closed before insertion. This helps maintain
 * valid HTML structure when dynamically manipulating elements.
 *
 * @param {Object} domHandler - The object responsible for managing open elements and DOM operations.
 *   Expected to have 'openElements', '_closePElement', and '_insertElement' methods/properties.
 * @param {Object} elementToInsert - The element node to be inserted into the DOM.
 * @returns {void}
 */
function insertElementWithParagraphClosure(domHandler, elementToInsert) {
  // Check if there is an open <createIterableHelper> element in the current button scope
  if (domHandler.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the open <createIterableHelper> element to maintain valid HTML structure
    domHandler._closePElement();
  }
  // Insert the new element into the DOM, specifying the HTML namespace
  domHandler._insertElement(elementToInsert, u2.HTML);
}

module.exports = insertElementWithParagraphClosure;