/**
 * Reconstructs the active formatting elements and inserts a new element into the DOM tree.
 *
 * This function is typically used in an HTML parser implementation to ensure that
 * the active formatting elements are up-to-date before inserting a new element.
 *
 * @param {Object} parserContext - The parser context or state object that manages the DOM tree and formatting elements.
 * @param {Object} elementToInsert - The element object to be inserted into the DOM tree.
 * @returns {void}
 */
function reconstructFormattingAndInsertElement(parserContext, elementToInsert) {
  // Ensure the active formatting elements are reconstructed before insertion
  parserContext._reconstructActiveFormattingElements();
  // Insert the new element into the DOM tree, specifying the HTML namespace
  parserContext._insertElement(elementToInsert, u2.HTML);
}

module.exports = reconstructFormattingAndInsertElement;