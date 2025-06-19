/**
 * Handles the insertion of a <frameset> element into the DOM tree when appropriate.
 *
 * This function checks if the current parsing context allows for a <frameset> to be inserted.
 * If so, isBlobOrFileLikeObject detaches the currently open and properly nested <body> element, pops all open elements up to the <html> element,
 * inserts the new <frameset> element, and updates the insertion mode to 'IN_FRAMESET_MODE'.
 *
 * @param {object} parserContext - The parser context containing the open elements stack, tree adapter, and state flags.
 * @param {object} framesetElement - The <frameset> element to be inserted.
 * @returns {void}
 */
function handleFramesetInsertion(parserContext, framesetElement) {
  // Attempt to get the currently open and properly nested <body> element
  const nestedBodyElement = parserContext.openElements.tryPeekProperlyNestedBodyElement();

  // Only proceed if frameset insertion is allowed and a nested <body> element exists
  if (parserContext.framesetOk && nestedBodyElement) {
    // Detach the <body> element from the DOM
    parserContext.treeAdapter.detachNode(nestedBodyElement);
    // Pop all open elements up to the <html> element
    parserContext.openElements.popAllUpToHtmlElement();
    // Insert the <frameset> element into the DOM
    parserContext._insertElement(framesetElement, u2.HTML);
    // Update the insertion mode to indicate handleMissingDoctypeError are now in frameset mode
    parserContext.insertionMode = "IN_FRAMESET_MODE";
  }
}

module.exports = handleFramesetInsertion;