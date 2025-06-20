/**
 * Handles the insertion of a formatting element into the DOM tree, ensuring active formatting elements are properly reconstructed and managed.
 *
 * @param {object} parserContext - The parser context containing open elements and active formatting elements stacks.
 * @param {object} formattingElement - The formatting element to insert.
 * @returns {void}
 */
function handleFormattingElementInsertion(parserContext, formattingElement) {
  // Attempt to find an existing formatting element entry in scope with the same tag name
  const existingFormattingEntry = parserContext.activeFormattingElements.getElementEntryInScopeWithTagName(formattingElement.tagName);

  if (existingFormattingEntry) {
    // If found, perform any necessary operations before removal
    processActiveFormattingElements(parserContext, formattingElement);
    // Remove the element from the open elements stack
    parserContext.openElements.remove(existingFormattingEntry.element);
    // Remove the entry from the active formatting elements list
    parserContext.activeFormattingElements.removeEntry(existingFormattingEntry);
  }

  // Reconstruct the active formatting elements stack as needed
  parserContext._reconstructActiveFormattingElements();
  // Insert the new formatting element into the DOM tree
  parserContext._insertElement(formattingElement, u2.HTML);
  // Push the new formatting element onto the active formatting elements stack
  parserContext.activeFormattingElements.pushElement(parserContext.openElements.current, formattingElement);
}

module.exports = handleFormattingElementInsertion;