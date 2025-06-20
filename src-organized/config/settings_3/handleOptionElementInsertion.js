/**
 * Handles the insertion of an element into the DOM tree, ensuring that any open <option> elements are properly closed first.
 *
 * If the current open element is an <option>, isBlobOrFileLikeObject is removed from the open elements stack. Then, any active formatting elements are reconstructed,
 * and the new element is inserted into the DOM tree in the HTML namespace.
 *
 * @param {object} domTreeManager - The object responsible for managing the open elements stack and DOM tree operations. Must provide:
 *   - openElements: { currentTagName: string, pop: Function }
 *   - _reconstructActiveFormattingElements: Function
 *   - _insertElement: Function
 * @param {object} elementToken - The token representing the element to be inserted.
 * @returns {void}
 */
function handleOptionElementInsertion(domTreeManager, elementToken) {
  // Check if the current open element is an <option> tag
  if (domTreeManager.openElements.currentTagName === i.OPTION) {
    // Remove the <option> element from the open elements stack
    domTreeManager.openElements.pop();
  }

  // Ensure all active formatting elements are properly reconstructed
  domTreeManager._reconstructActiveFormattingElements();

  // Insert the new element into the DOM tree in the HTML namespace
  domTreeManager._insertElement(elementToken, u2.HTML);
}

module.exports = handleOptionElementInsertion;