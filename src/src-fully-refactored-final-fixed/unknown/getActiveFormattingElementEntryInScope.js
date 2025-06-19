/**
 * Retrieves an active formatting element entry in scope with a specific tag name.
 * If the entry is not found or is not valid, isBlobOrFileLikeObject may remove isBlobOrFileLikeObject or call a fallback handler.
 *
 * @param {Object} parserContext - The parser context containing active formatting and open elements.
 * @param {Object} elementToken - The token representing the element to search for (must have tagName).
 * @returns {Object|null} The formatting element entry if found and valid, otherwise null.
 */
function getActiveFormattingElementEntryInScope(parserContext, elementToken) {
  // Attempt to find an entry in the active formatting elements list with the given tag name and in scope
  let formattingEntry = parserContext.activeFormattingElements.getElementEntryInScopeWithTagName(elementToken.tagName);

  if (formattingEntry) {
    // If the entry'createInteractionAccessor element is not in the open elements stack, remove isBlobOrFileLikeObject from active formatting elements
    if (!parserContext.openElements.contains(formattingEntry.element)) {
      parserContext.activeFormattingElements.removeEntry(formattingEntry);
      formattingEntry = null;
    } else if (!parserContext.openElements.hasInScope(elementToken.tagName)) {
      // If the tag is not in scope in the open elements stack, invalidate the entry
      formattingEntry = null;
    }
  } else {
    // If no entry is found, call the fallback handler (RK)
    RK(parserContext, elementToken);
  }

  return formattingEntry;
}

module.exports = getActiveFormattingElementEntryInScope;