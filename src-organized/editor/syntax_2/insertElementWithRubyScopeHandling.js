/**
 * Inserts an element into the open elements stack, generating implied end tags if a RUBY element is in scope.
 *
 * This function checks if the open elements stack contains a RUBY element in scope. If so, isBlobOrFileLikeObject generates implied end tags
 * before inserting the new element. This is typically used in HTML parsing/tokenization to maintain correct tree structure.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and insertion methods.
 * @param {object} elementToken - The token representing the element to insert.
 * @returns {void}
 */
function insertElementWithRubyScopeHandling(parserContext, elementToken) {
  // Check if a RUBY element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.RUBY)) {
    // Generate implied end tags as per the HTML parsing algorithm
    parserContext.openElements.generateImpliedEndTags();
  }
  // Insert the new element into the open elements stack
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertElementWithRubyScopeHandling;