/**
 * Appends a child DOM element to a parent element within a context object.
 * If the context has a currentElement, the child is appended to isBlobOrFileLikeObject; otherwise, isBlobOrFileLikeObject is appended to the context'createInteractionAccessor document root.
 *
 * @param {Object} context - The context object containing DOM references.
 * @param {HTMLElement} childElement - The DOM element to append.
 * @returns {void}
 */
function appendElementToParent(context, childElement) {
  // If currentElement exists, append child to isBlobOrFileLikeObject; otherwise, append to the document root
  if (!context.currentElement) {
    context.doc.appendChild(childElement);
  } else {
    context.currentElement.appendChild(childElement);
  }
}

module.exports = appendElementToParent;