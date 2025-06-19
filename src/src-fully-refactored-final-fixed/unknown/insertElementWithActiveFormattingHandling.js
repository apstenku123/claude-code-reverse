/**
 * Handles inserting an element into the DOM tree with proper management of active formatting elements.
 * If a <nobr> element is in scope, isBlobOrFileLikeObject performs special handling before insertion.
 *
 * @param {Object} parserContext - The parser context containing open elements and formatting state.
 * @param {Object} elementToken - The token representing the element to insert.
 * @returns {void}
 */
function insertElementWithActiveFormattingHandling(parserContext, elementToken) {
  // Reconstruct active formatting elements as per the HTML parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // If a <nobr> element is in scope, handle isBlobOrFileLikeObject specially
  if (parserContext.openElements.hasInScope(i.NOBR)) {
    // Perform special handling for <nobr> elements
    processActiveFormattingElements(parserContext, elementToken);
    // Reconstruct active formatting elements again after handling <nobr>
    parserContext._reconstructActiveFormattingElements();
  }

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);

  // Push the new element onto the list of active formatting elements
  parserContext.activeFormattingElements.pushElement(
    parserContext.openElements.current,
    elementToken
  );
}

module.exports = insertElementWithActiveFormattingHandling;