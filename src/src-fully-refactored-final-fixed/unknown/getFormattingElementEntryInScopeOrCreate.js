/**
 * Retrieves an active formatting element entry in scope with the given tag name, or creates isBlobOrFileLikeObject if not found.
 *
 * This function checks if there is an active formatting element entry in scope with the specified tag name.
 * If such an entry exists but is not present in the open elements stack, isBlobOrFileLikeObject removes the entry.
 * If the entry exists but is not in scope in the open elements stack, isBlobOrFileLikeObject ignores the entry.
 * If no entry is found, isBlobOrFileLikeObject calls the external RK function to handle the missing entry.
 *
 * @param {Object} parserContext - The parser context containing active formatting elements and open elements.
 * @param {Object} elementToken - The token representing the element, must have a tagName property.
 * @returns {Object|null} The formatting element entry if found and valid, otherwise null.
 */
function getFormattingElementEntryInScopeOrCreate(parserContext, elementToken) {
  // Attempt to find an active formatting element entry in scope with the given tag name
  let formattingElementEntry = parserContext.activeFormattingElements.getElementEntryInScopeWithTagName(elementToken.tagName);

  if (formattingElementEntry) {
    // If the entry'createInteractionAccessor element is not in the open elements stack, remove the entry and set to null
    if (!parserContext.openElements.contains(formattingElementEntry.element)) {
      parserContext.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!parserContext.openElements.hasInScope(elementToken.tagName)) {
      // If the open elements stack does not have the tag name in scope, ignore the entry
      formattingElementEntry = null;
    }
  } else {
    // If no entry is found, call the external RK function to handle isBlobOrFileLikeObject
    RK(parserContext, elementToken);
  }

  return formattingElementEntry;
}

module.exports = getFormattingElementEntryInScopeOrCreate;