/**
 * Inserts an element into the DOM, ensuring that any open <createIterableHelper> elements are properly closed if necessary.
 *
 * This function checks if there is an open <createIterableHelper> element within the current button scope. If so, isBlobOrFileLikeObject closes the <createIterableHelper> element
 * before inserting the new element. The insertion is performed in the context of the HTML namespace.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation, containing openElements and insertion methods.
 * @param {Object} elementToInsert - The element node to be inserted into the DOM.
 * @returns {void}
 */
function insertElementWithParagraphHandling(domHandler, elementToInsert) {
  // Check if there is an open <createIterableHelper> element in the current button scope
  if (domHandler.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the open <createIterableHelper> element before inserting the new element
    domHandler._closePElement();
  }
  // Insert the new element into the DOM within the HTML namespace
  domHandler._insertElement(elementToInsert, u2.HTML);
}

module.exports = insertElementWithParagraphHandling;