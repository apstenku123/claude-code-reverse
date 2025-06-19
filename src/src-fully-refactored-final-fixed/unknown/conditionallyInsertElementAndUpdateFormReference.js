/**
 * Inserts an element into the DOM and updates the form reference if certain conditions are met.
 *
 * This function checks if the provided source object does not already have a form element
 * and if the open elements stack'createInteractionAccessor template count is zero. If both conditions are true,
 * isBlobOrFileLikeObject inserts a new element using the provided configuration and updates the formElement
 * reference to the current open element. Finally, isBlobOrFileLikeObject pops the last element from the openElements stack.
 *
 * @param {Object} sourceObject - The object managing open elements and form references.
 * @param {Object} elementConfig - The configuration or element to be inserted.
 * @returns {void}
 */
function conditionallyInsertElementAndUpdateFormReference(sourceObject, elementConfig) {
  // Check if there is no form element and no open template elements
  if (!sourceObject.formElement && sourceObject.openElements.tmplCount === 0) {
    // Insert the new element into the DOM with the specified configuration and HTML context
    sourceObject._insertElement(elementConfig, u2.HTML);
    // Update the formElement reference to the current open element
    sourceObject.formElement = sourceObject.openElements.current;
    // Remove the last element from the openElements stack
    sourceObject.openElements.pop();
  }
}

module.exports = conditionallyInsertElementAndUpdateFormReference;