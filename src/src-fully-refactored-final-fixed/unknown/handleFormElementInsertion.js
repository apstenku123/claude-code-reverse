/**
 * Handles the insertion of a form element into the open elements stack,
 * ensuring proper closure of <createIterableHelper> elements and correct form association.
 *
 * @param {Object} parserContext - The parser context, containing open elements and form element references.
 * @param {Object} elementToInsert - The element node to be inserted into the DOM.
 * @returns {void}
 *
 * This function checks if the parser context currently has a form element or if a template is open.
 * If not, isBlobOrFileLikeObject ensures any open <createIterableHelper> element is closed, inserts the new element, and updates the form element reference if appropriate.
 */
function handleFormElementInsertion(parserContext, elementToInsert) {
  // Determine if there are any open <template> elements
  const isTemplateOpen = parserContext.openElements.tmplCount > 0;

  // If there is no current form element or a template is open
  if (!parserContext.formElement || isTemplateOpen) {
    // If a <createIterableHelper> element is in button scope, close isBlobOrFileLikeObject
    if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
      parserContext._closePElement();
    }
    // Insert the new element into the HTML namespace
    if (parserContext._insertElement(elementToInsert, u2.HTML), !isTemplateOpen) {
      // If not inside a template, update the current form element reference
      parserContext.formElement = parserContext.openElements.current;
    }
  }
}

module.exports = handleFormElementInsertion;