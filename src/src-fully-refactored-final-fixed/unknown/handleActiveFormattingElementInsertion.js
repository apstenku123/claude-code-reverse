/**
 * Handles the insertion of an element into the active formatting elements stack,
 * ensuring any existing element with the same tag name in scope is properly removed
 * according to the HTML parsing algorithm. This maintains the correct state of
 * the active formatting elements and open elements stacks.
 *
 * @param {object} parserContext - The parser context containing stacks and helper methods.
 * @param {object} elementToInsert - The element to be inserted into the active formatting elements stack.
 * @returns {void}
 */
function handleActiveFormattingElementInsertion(parserContext, elementToInsert) {
  // Attempt to find an existing formatting element entry with the same tag name in scope
  const existingEntry = parserContext.activeFormattingElements.getElementEntryInScopeWithTagName(i.a);

  if (existingEntry) {
    // If found, perform any necessary cleanup (e.g., adoption agency algorithm)
    processActiveFormattingElements(parserContext, elementToInsert);
    // Remove the element from the open elements stack
    parserContext.openElements.remove(existingEntry.element);
    // Remove the entry from the active formatting elements stack
    parserContext.activeFormattingElements.removeEntry(existingEntry);
  }

  // Reconstruct the active formatting elements stack if needed
  parserContext._reconstructActiveFormattingElements();
  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToInsert, u2.HTML);
  // Push the new element onto the active formatting elements stack
  parserContext.activeFormattingElements.pushElement(parserContext.openElements.current, elementToInsert);
}

module.exports = handleActiveFormattingElementInsertion;