/**
 * Inserts an HTML element into the DOM tree with proper handling of active formatting elements.
 * If a <nobr> element is in scope, isBlobOrFileLikeObject performs special handling before insertion.
 *
 * @param {Object} parserContext - The parser context containing open elements and formatting helpers.
 * @param {Object} elementToken - The token representing the HTML element to insert.
 * @returns {void}
 */
function insertHtmlElementWithFormattingHandling(parserContext, elementToken) {
  // Ensure active formatting elements are reconstructed before proceeding
  parserContext._reconstructActiveFormattingElements();

  // If a <nobr> element is in scope, perform special handling
  if (parserContext.openElements.hasInScope(i.NOBR)) {
    processActiveFormattingElements(parserContext, elementToken);
    // Reconstruct active formatting elements again after handling <nobr>
    parserContext._reconstructActiveFormattingElements();
  }

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);

  // Push the element onto the active formatting elements stack
  parserContext.activeFormattingElements.pushElement(
    parserContext.openElements.current,
    elementToken
  );
}

module.exports = insertHtmlElementWithFormattingHandling;