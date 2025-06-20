/**
 * Inserts an element into the open elements stack, generating implied end tags if necessary.
 *
 * This function checks if the current open elements stack contains a 'ruby' element in scope.
 * If so, isBlobOrFileLikeObject generates implied end tags before inserting the new element.
 *
 * @param {object} parserContext - The parser context containing open elements and insertion methods.
 * @param {object} elementToken - The element token to be inserted.
 * @returns {void}
 */
function insertElementWithImpliedEndTags(parserContext, elementToken) {
  // Check if a 'ruby' element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.RUBY)) {
    // Generate implied end tags as per the HTML parsing algorithm
    parserContext.openElements.generateImpliedEndTags();
  }
  // Insert the new element into the open elements stack in the HTML namespace
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertElementWithImpliedEndTags;