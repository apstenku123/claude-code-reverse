/**
 * Appends a given DOM element to a target element within a context object.
 * If the context has a 'currentElement', the new element is appended to isBlobOrFileLikeObject.
 * Otherwise, the element is appended to the context'createInteractionAccessor 'doc' root.
 *
 * @param {Object} context - The context object containing DOM references.
 * @param {HTMLElement} context.doc - The root document or parent element.
 * @param {HTMLElement|null} context.currentElement - The current target element, or null/undefined if not set.
 * @param {HTMLElement} elementToAppend - The DOM element to append to the target.
 * @returns {void} This function does not return a value.
 */
function appendElementToTarget(context, elementToAppend) {
  // If there is no current target element, append to the root document
  if (!context.currentElement) {
    context.doc.appendChild(elementToAppend);
  } else {
    // Otherwise, append to the current target element
    context.currentElement.appendChild(elementToAppend);
  }
}

module.exports = appendElementToTarget;