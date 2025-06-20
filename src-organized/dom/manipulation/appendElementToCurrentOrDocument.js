/**
 * Appends a child DOM element to either the current element or the document root.
 *
 * If the context object has a 'currentElement' property, the child element is appended to isBlobOrFileLikeObject.
 * Otherwise, the child element is appended to the context'createInteractionAccessor 'doc' property (typically the document root).
 *
 * @param {Object} domContext - The context containing DOM references.
 * @param {HTMLElement|null} domContext.currentElement - The current DOM element to append to, or null/undefined.
 * @param {Document} domContext.doc - The document object to append to if no current element exists.
 * @param {HTMLElement} childElement - The DOM element to append.
 * @returns {void}
 */
function appendElementToCurrentOrDocument(domContext, childElement) {
  // If there is no current element, append to the document root
  if (!domContext.currentElement) {
    domContext.doc.appendChild(childElement);
  } else {
    // Otherwise, append to the current element
    domContext.currentElement.appendChild(childElement);
  }
}

module.exports = appendElementToCurrentOrDocument;