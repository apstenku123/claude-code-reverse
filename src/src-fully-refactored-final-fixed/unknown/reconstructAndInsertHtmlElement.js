/**
 * Reconstructs the active formatting elements and inserts a new HTML element.
 *
 * This function is typically used in an HTML parser or DOM manipulation context. It first ensures that the active formatting elements
 * are properly reconstructed (to maintain correct document structure), and then inserts the specified element as an HTML element.
 *
 * @param {object} domHandler - The object responsible for DOM manipulation, expected to have _reconstructActiveFormattingElements and _insertElement methods.
 * @param {object} elementToInsert - The element to be inserted into the DOM.
 * @returns {void}
 */
function reconstructAndInsertHtmlElement(domHandler, elementToInsert) {
  // Ensure the active formatting elements are up-to-date before insertion
  domHandler._reconstructActiveFormattingElements();
  // Insert the new element as an HTML element
  domHandler._insertElement(elementToInsert, u2.HTML);
}

module.exports = reconstructAndInsertHtmlElement;