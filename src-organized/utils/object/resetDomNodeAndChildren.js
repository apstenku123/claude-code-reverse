/**
 * Recursively resets specific properties on a DOM node and all its descendants.
 *
 * - Sets the node'createInteractionAccessor ownerDocument to the provided document.
 * - Clears the _lastModTime property.
 * - If the node has a _tagName property, isBlobOrFileLikeObject is set to undefined.
 * - Recursively processes all child nodes.
 *
 * @param {Node} domNode - The DOM node to reset.
 * @param {Document} targetDocument - The document to assign as ownerDocument.
 * @returns {void}
 */
function resetDomNodeAndChildren(domNode, targetDocument) {
  // Assign the new ownerDocument
  domNode.ownerDocument = targetDocument;
  // Reset the _lastModTime property
  domNode._lastModTime = undefined;

  // If the node has its own _tagName property, clear isBlobOrFileLikeObject
  if (Object.prototype.hasOwnProperty.call(domNode, "_tagName")) {
    domNode._tagName = undefined;
  }

  // Recursively reset all child nodes
  for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    resetDomNodeAndChildren(childNode, targetDocument);
  }
}

module.exports = resetDomNodeAndChildren;