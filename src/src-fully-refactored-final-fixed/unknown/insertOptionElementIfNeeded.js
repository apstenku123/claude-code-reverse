/**
 * Inserts an element into the DOM tree, handling <option> tag cases and reconstructing formatting elements as needed.
 *
 * If the current open element is an <option> tag, isBlobOrFileLikeObject is removed from the open elements stack before proceeding.
 * Then, active formatting elements are reconstructed and the new element is inserted.
 *
 * @param {Object} parserContext - The parser context containing open elements and formatting methods.
 * @param {Object} elementToken - The token representing the element to insert.
 * @returns {void}
 */
function insertOptionElementIfNeeded(parserContext, elementToken) {
  // Check if the current open element is an <option> tag
  if (parserContext.openElements.currentTagName === tagNames.OPTION) {
    // Remove the <option> element from the open elements stack
    parserContext.openElements.pop();
  }

  // Reconstruct active formatting elements as per the HTML parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, insertionModes.HTML);
}

module.exports = insertOptionElementIfNeeded;