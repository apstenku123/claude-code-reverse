/**
 * Handles the insertion of a fake <br> element when reconstructing active formatting elements.
 * This function is typically used in an HTML parser implementation to ensure that the active formatting
 * elements are correctly reconstructed, a fake <br> element is inserted, and the parser'createInteractionAccessor state is updated accordingly.
 *
 * @param {object} parserContext - The parser context object containing the current parsing state and methods.
 *   Expected to have the following properties/methods:
 *     - _reconstructActiveFormattingElements(): Reconstructs the active formatting elements stack.
 *     - _insertFakeElement(tagName): Inserts a fake element with the specified tag name.
 *     - openElements: An array representing the stack of open elements.
 *     - framesetOk: Boolean flag indicating if a frameset is allowed.
 *
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the parser context.
 */
function handleFormattingElementBreakInsertion(parserContext) {
  // Reconstruct the stack of active formatting elements as per the parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // Insert a fake <br> element into the DOM tree
  parserContext._insertFakeElement('br');

  // Remove the most recently opened element from the stack
  parserContext.openElements.pop();

  // Indicate that a frameset is no longer allowed after this insertion
  parserContext.framesetOk = false;
}

module.exports = handleFormattingElementBreakInsertion;