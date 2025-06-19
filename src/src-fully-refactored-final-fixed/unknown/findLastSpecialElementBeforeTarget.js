/**
 * Finds the last special element in the open elements stack before a given target element.
 * If no such special element is found, pops elements from the stack until the target element is removed,
 * and removes the corresponding formatting entry.
 *
 * @param {object} parserContext - The parser context containing openElements and activeFormattingElements.
 * @param {object} formattingEntry - The formatting entry containing the target element.
 * @returns {object|null} The last special element found before the target element, or null if none found.
 */
function findLastSpecialElementBeforeTarget(parserContext, formattingEntry) {
  let lastSpecialElement = null;
  // Traverse the open elements stack from top to bottom
  for (let stackIndex = parserContext.openElements.stackTop; stackIndex >= 0; stackIndex--) {
    const currentElement = parserContext.openElements.items[stackIndex];
    // Stop if handleMissingDoctypeError reach the target element
    if (currentElement === formattingEntry.element) break;
    // Check if the current element is special
    if (parserContext._isSpecialElement(currentElement)) {
      lastSpecialElement = currentElement;
    }
  }
  // If no special element was found, pop elements until the target is removed and remove formatting entry
  if (!lastSpecialElement) {
    parserContext.openElements.popUntilElementPopped(formattingEntry.element);
    parserContext.activeFormattingElements.removeEntry(formattingEntry);
  }
  return lastSpecialElement;
}

module.exports = findLastSpecialElementBeforeTarget;