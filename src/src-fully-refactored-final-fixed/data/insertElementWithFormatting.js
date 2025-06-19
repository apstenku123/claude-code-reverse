/**
 * Inserts an element into the DOM with proper handling of active formatting elements.
 *
 * This function reconstructs the active formatting elements stack, inserts the given element,
 * and updates the active formatting elements list accordingly. It is typically used in the context
 * of an HTML parser or DOM tree builder that manages formatting elements (like <b>, <i>, etc.).
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation and formatting state.
 *   Must provide the methods: _reconstructActiveFormattingElements(), _insertElement(),
 *   and properties: activeFormattingElements, openElements.
 * @param {Object} element - The element to be inserted into the DOM.
 * @returns {void}
 */
function insertElementWithFormatting(domHandler, element) {
  // Ensure the active formatting elements are up to date before insertion
  domHandler._reconstructActiveFormattingElements();

  // Insert the element into the DOM, specifying the namespace as HTML
  domHandler._insertElement(element, u2.HTML);

  // Push the newly inserted element onto the active formatting elements stack
  // This helps maintain the correct formatting context for subsequent elements
  domHandler.activeFormattingElements.pushElement(
    domHandler.openElements.current,
    element
  );
}

module.exports = insertElementWithFormatting;