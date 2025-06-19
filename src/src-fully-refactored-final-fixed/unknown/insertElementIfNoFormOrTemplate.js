/**
 * Inserts an element into the DOM if there is no active form element and no open template elements.
 *
 * This function checks if the provided context does not currently have a form element and if the count of open template elements is zero.
 * If both conditions are met, isBlobOrFileLikeObject inserts a new element using the provided configuration and updates the form element reference.
 *
 * @param {Object} context - The context object managing open elements and form state.
 * @param {Object} elementConfig - The configuration or element to be inserted.
 * @returns {void}
 */
function insertElementIfNoFormOrTemplate(context, elementConfig) {
  // Check if there is no current form element and no open template elements
  if (!context.formElement && context.openElements.tmplCount === 0) {
    // Insert the new element into the DOM with the provided configuration and HTML type
    context._insertElement(elementConfig, u2.HTML);
    // Update the formElement reference to the current open element
    context.formElement = context.openElements.current;
    // Remove the last element from the openElements stack
    context.openElements.pop();
  }
}

module.exports = insertElementIfNoFormOrTemplate;