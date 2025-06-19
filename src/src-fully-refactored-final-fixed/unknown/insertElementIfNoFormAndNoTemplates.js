/**
 * Inserts an element into the DOM if there is no current form element and no open template elements.
 *
 * @param {Object} domContext - The context object managing DOM elements, including form and open elements.
 * @param {any} elementToInsert - The element to be inserted into the DOM.
 * @returns {void}
 */
function insertElementIfNoFormAndNoTemplates(domContext, elementToInsert) {
  // Check if there is no current form element and no open template elements
  if (!domContext.formElement && domContext.openElements.tmplCount === 0) {
    // Insert the element into the DOM using the provided method and HTML context
    domContext._insertElement(elementToInsert, u2.HTML);
    // Update the formElement reference to the current open element
    domContext.formElement = domContext.openElements.current;
    // Remove the last open element from the stack
    domContext.openElements.pop();
  }
}

module.exports = insertElementIfNoFormAndNoTemplates;