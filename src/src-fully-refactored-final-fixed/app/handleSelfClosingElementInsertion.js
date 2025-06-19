/**
 * Handles the insertion of a self-closing HTML element into the DOM tree.
 *
 * This function reconstructs the active formatting elements stack, appends a new element
 * to the DOM tree, marks the frameset as not allowed, and acknowledges the element as self-closing.
 *
 * @param {object} domTreeManager - The object responsible for managing the DOM tree and formatting elements.
 *   Must implement _reconstructActiveFormattingElements() and _appendElement().
 * @param {object} elementNode - The element node to be appended. Will be marked as self-closing.
 * @returns {void}
 */
function handleSelfClosingElementInsertion(domTreeManager, elementNode) {
  // Ensure the active formatting elements are up to date before insertion
  domTreeManager._reconstructActiveFormattingElements();

  // Append the new element node to the DOM tree, specifying the HTML namespace
  domTreeManager._appendElement(elementNode, u2.HTML);

  // Mark that a frameset is no longer allowed after this insertion
  domTreeManager.framesetOk = false;

  // Mark the element as self-closing for further processing
  elementNode.ackSelfClosing = true;
}

module.exports = handleSelfClosingElementInsertion;