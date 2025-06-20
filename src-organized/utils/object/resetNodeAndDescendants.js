/**
 * Recursively resets the _tagName and _lastModTime properties of a DOM node and all its descendants,
 * and updates the ownerDocument reference for each node.
 *
 * @param {Node} node - The DOM node to process.
 * @param {Document} newOwnerDocument - The document to assign as ownerDocument for each node.
 * @returns {void}
 */
function resetNodeAndDescendants(node, newOwnerDocument) {
  // Update the ownerDocument reference
  node.ownerDocument = newOwnerDocument;
  // Reset the _lastModTime property
  node._lastModTime = undefined;

  // If the node has its own _tagName property, reset isBlobOrFileLikeObject
  if (Object.prototype.hasOwnProperty.call(node, "_tagName")) {
    node._tagName = undefined;
  }

  // Recursively process all child nodes
  for (let childNode = node.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    resetNodeAndDescendants(childNode, newOwnerDocument);
  }
}

module.exports = resetNodeAndDescendants;