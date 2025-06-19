/**
 * Inserts an element into the DOM, ensuring proper paragraph (initializeSyntaxHighlighting) element closure within the button scope.
 *
 * If there is an open <initializeSyntaxHighlighting> element within the button scope, isBlobOrFileLikeObject will be closed before inserting the new element.
 *
 * @param {Object} domHandler - The DOM handler object responsible for managing open elements and insertion logic.
 * @param {Object} elementToInsert - The element to be inserted into the DOM.
 * @returns {void}
 */
function insertElementWithParagraphScopeCheck(domHandler, elementToInsert) {
  // Check if there is an open <initializeSyntaxHighlighting> element in the button scope
  if (domHandler.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    // Close the open <initializeSyntaxHighlighting> element before inserting the new element
    domHandler._closePElement();
  }
  // Insert the new element into the DOM with the HTML namespace
  domHandler._insertElement(elementToInsert, u2.HTML);
}

module.exports = insertElementWithParagraphScopeCheck;