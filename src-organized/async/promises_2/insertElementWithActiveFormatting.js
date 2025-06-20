/**
 * Inserts an element into the DOM and updates the active formatting elements stack.
 *
 * This function first reconstructs the active formatting elements, then inserts the provided element
 * into the DOM within the HTML namespace, and finally pushes the new element onto the active formatting
 * elements stack for tracking.
 *
 * @param {Object} domHandler - The DOM handler object responsible for managing elements and formatting stacks.
 * @param {Object} elementToInsert - The element object to be inserted into the DOM and tracked.
 * @returns {void}
 */
function insertElementWithActiveFormatting(domHandler, elementToInsert) {
  // Ensure the active formatting elements are up to date before insertion
  domHandler._reconstructActiveFormattingElements();

  // Insert the new element into the DOM within the HTML namespace
  domHandler._insertElement(elementToInsert, u2.HTML);

  // Push the current open element and the new element onto the active formatting elements stack
  domHandler.activeFormattingElements.pushElement(domHandler.openElements.current, elementToInsert);
}

module.exports = insertElementWithActiveFormatting;