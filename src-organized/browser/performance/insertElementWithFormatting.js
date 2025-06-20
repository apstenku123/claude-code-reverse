/**
 * Inserts an element into the DOM tree with proper formatting context management.
 *
 * This function ensures that the active formatting elements are reconstructed,
 * inserts the provided element into the DOM, adds a marker to the active formatting elements,
 * and updates the framesetOk flag to indicate that a frameset is no longer allowed.
 *
 * @param {Object} domTreeManager - The object responsible for managing the DOM tree and formatting context.
 *   Must implement the following methods/properties:
 *     - _reconstructActiveFormattingElements(): void
 *     - _insertElement(element: Object, htmlNamespace: string): void
 *     - activeFormattingElements.insertMarker(): void
 *     - framesetOk: boolean
 * @param {Object} elementToInsert - The element object to be inserted into the DOM tree.
 * @returns {void}
 */
function insertElementWithFormatting(domTreeManager, elementToInsert) {
  // Reconstruct the list of active formatting elements before insertion
  domTreeManager._reconstructActiveFormattingElements();

  // Insert the new element into the DOM tree within the HTML namespace
  domTreeManager._insertElement(elementToInsert, u2.HTML);

  // Insert a marker into the active formatting elements list
  domTreeManager.activeFormattingElements.insertMarker();

  // Mark that a frameset is no longer allowed after this insertion
  domTreeManager.framesetOk = false;
}

module.exports = insertElementWithFormatting;