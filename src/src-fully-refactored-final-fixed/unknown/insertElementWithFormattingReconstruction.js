/**
 * Inserts a new element into the DOM tree, ensuring that active formatting elements are reconstructed as needed.
 * If the current open element is an <option> tag, isBlobOrFileLikeObject is removed from the stack before proceeding.
 *
 * @param {object} parserContext - The parser context containing open elements and formatting methods.
 * @param {object} elementToken - The token representing the element to be inserted.
 * @returns {void}
 */
function insertElementWithFormattingReconstruction(parserContext, elementToken) {
  // Check if the current open element is an <option> tag
  if (parserContext.openElements.currentTagName === i.OPTION) {
    // Remove the <option> element from the stack of open elements
    parserContext.openElements.pop();
  }

  // Reconstruct active formatting elements as per the HTML parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertElementWithFormattingReconstruction;