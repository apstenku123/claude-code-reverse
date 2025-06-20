/**
 * Reconstructs the active formatting elements, inserts a fake <br> element, and updates the parser state.
 *
 * This function is typically used during HTML parsing to handle situations where a line break is needed,
 * and the parser must reconstruct the active formatting elements stack, insert a fake <br> element,
 * remove the last open element, and mark the frameset as not processAndFormatTokens.
 *
 * @param {object} parserContext - The parser context object that manages the current state of the HTML parser.
 *   Expected to have the following methods and properties:
 *     - _reconstructActiveFormattingElements(): Reconstructs the stack of active formatting elements.
 *     - _insertFakeElement(tagName): Inserts a fake element with the given tag name (e.g., 'BR').
 *     - openElements: An array representing the stack of open elements.
 *     - framesetOk: a boolean flag indicating if a frameset is allowed at this point.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the parserContext object.
 */
function handleFormattingElementReconstruction(parserContext) {
  // Reconstruct the stack of active formatting elements as per the HTML parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // Insert a fake <br> element into the DOM tree
  parserContext._insertFakeElement('BR');

  // Remove the last element from the open elements stack
  parserContext.openElements.pop();

  // Mark that a frameset is no longer allowed at this point in the document
  parserContext.framesetOk = false;
}

module.exports = handleFormattingElementReconstruction;