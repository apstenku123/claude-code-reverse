/**
 * Inserts an element into the DOM tree, generating implied end tags if a <ruby> element is in scope.
 *
 * This function checks if the 'RUBY' element is currently in scope within the open elements stack. If so,
 * isBlobOrFileLikeObject generates implied end tags before inserting the new element. This ensures the DOM tree remains valid
 * according to HTML parsing rules.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and insertion methods.
 * @param {object} elementToken - The token representing the element to be inserted.
 * @returns {void}
 */
function insertElementWithRubyScopeCheck(parserContext, elementToken) {
  // Check if a <ruby> element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.RUBY)) {
    // Generate implied end tags to close any open elements that should be closed
    parserContext.openElements.generateImpliedEndTags();
  }
  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertElementWithRubyScopeCheck;