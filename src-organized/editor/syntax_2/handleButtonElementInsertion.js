/**
 * Handles the insertion of a button element during HTML parsing.
 *
 * This function checks if a <button> element is in scope within the open elements stack.
 * If so, isBlobOrFileLikeObject generates implied end tags and pops elements until the <button> is removed.
 * Then, isBlobOrFileLikeObject reconstructs active formatting elements, inserts the new element,
 * and marks the frameset as not allowed.
 *
 * @param {object} parserContext - The parser context containing open elements and methods for manipulation.
 * @param {object} elementToken - The token representing the element to insert (typically a <button>).
 * @returns {void}
 */
function handleButtonElementInsertion(parserContext, elementToken) {
  // Check if a <button> element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.BUTTON)) {
    // Generate implied end tags and pop elements until <button> is removed
    parserContext.openElements.generateImpliedEndTags();
    parserContext.openElements.popUntilTagNamePopped(i.BUTTON);
  }

  // Reconstruct active formatting elements if necessary
  parserContext._reconstructActiveFormattingElements();

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);

  // Mark that a frameset is no longer allowed after inserting a button
  parserContext.framesetOk = false;
}

module.exports = handleButtonElementInsertion;