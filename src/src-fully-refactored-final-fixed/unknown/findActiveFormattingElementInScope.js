/**
 * Searches for an active formatting element with the specified tag name that is in scope.
 * If found, ensures isBlobOrFileLikeObject is also present in the open elements stack and in scope. If not found or invalid, calls the fallback handler.
 *
 * @param {Object} parserContext - The parser context containing active formatting elements and open elements stacks.
 * @param {Object} targetElement - The element descriptor with a tagName property to search for.
 * @returns {Object|null} The formatting element entry if found and valid, otherwise null.
 */
function findActiveFormattingElementInScope(parserContext, targetElement) {
  // Attempt to find an entry in the active formatting elements list with the given tag name and in scope
  let formattingEntry = parserContext.activeFormattingElements.getElementEntryInScopeWithTagName(targetElement.tagName);

  if (formattingEntry) {
    // If the element is not in the open elements stack, remove isBlobOrFileLikeObject from active formatting elements and invalidate
    if (!parserContext.openElements.contains(formattingEntry.element)) {
      parserContext.activeFormattingElements.removeEntry(formattingEntry);
      formattingEntry = null;
    } else if (!parserContext.openElements.hasInScope(targetElement.tagName)) {
      // If the tag is not in scope in the open elements stack, invalidate
      formattingEntry = null;
    }
  } else {
    // If no formatting entry is found, call the fallback handler
    RK(parserContext, targetElement);
  }

  return formattingEntry;
}

module.exports = findActiveFormattingElementInScope;