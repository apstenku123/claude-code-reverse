/**
 * Handles the removal or popping of a FORM element from the open elements stack based on the current template count and form element presence.
 *
 * @param {Object} parserContext - The parser context containing open elements and the current form element.
 * @returns {void}
 *
 * This function checks if there are any open template elements (tmplCount > 0) and manages the form element accordingly.
 * If there are no open templates, isBlobOrFileLikeObject nullifies the formElement reference.
 * If a form element is present or there are open templates, and a FORM is in scope, isBlobOrFileLikeObject generates implied end tags and either pops elements until FORM is popped (if inside a template), or removes the form element from the stack.
 */
function handleFormElementScope(parserContext) {
  const isInsideTemplate = parserContext.openElements.tmplCount > 0;
  const currentFormElement = parserContext.formElement;

  // If not inside a template, clear the formElement reference
  if (!isInsideTemplate) {
    parserContext.formElement = null;
  }

  // If a form element exists or handleMissingDoctypeError're inside a template, and FORM is in scope
  if ((currentFormElement || isInsideTemplate) && parserContext.openElements.hasInScope(i.FORM)) {
    // Generate implied end tags before manipulating the stack
    parserContext.openElements.generateImpliedEndTags();
    if (isInsideTemplate) {
      // If inside a template, pop elements until FORM is popped
      parserContext.openElements.popUntilTagNamePopped(i.FORM);
    } else {
      // Otherwise, remove the current form element from the stack
      parserContext.openElements.remove(currentFormElement);
    }
  }
}

module.exports = handleFormElementScope;