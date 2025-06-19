/**
 * Inserts an HTML element into the open elements stack, generating implied end tags if a <ruby> element is in scope.
 *
 * If the open elements stack contains a <ruby> element in scope, this function first generates implied end tags,
 * excluding <rtc> elements, before inserting the new element. This is typically used during HTML parsing to ensure
 * correct tree construction according to the HTML parsing algorithm.
 *
 * @param {object} parserContext - The parser context object, which manages the open elements stack and insertion logic.
 *   Expected to have the following properties/methods:
 *     - openElements: an object with methods hasInScope(tagName) and generateImpliedEndTagsWithExclusion(tagName)
 *     - _insertElement(element, namespace): function to insert the element
 * @param {object} elementToInsert - The element to be inserted into the open elements stack.
 * @returns {void}
 */
function insertHtmlElementWithRubyScopeCheck(parserContext, elementToInsert) {
  // Check if a <ruby> element is in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.RUBY)) {
    // Generate implied end tags, but do not close <rtc> elements
    parserContext.openElements.generateImpliedEndTagsWithExclusion(i.RTC);
  }
  // Insert the new element into the open elements stack in the HTML namespace
  parserContext._insertElement(elementToInsert, u2.HTML);
}

module.exports = insertHtmlElementWithRubyScopeCheck;