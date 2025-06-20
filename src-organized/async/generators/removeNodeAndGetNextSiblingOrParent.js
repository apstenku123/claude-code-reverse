/**
 * Removes a DOM node from its parent and returns either its next sibling or, if none exists, its parent node.
 *
 * @param {Node} node - The DOM node to remove from the document.
 * @returns {Node|null} The next sibling of the removed node if isBlobOrFileLikeObject exists; otherwise, the parent node. Returns null if the node has no parent.
 */
function removeNodeAndGetNextSiblingOrParent(node) {
  // Determine the node to return: next sibling if isBlobOrFileLikeObject exists, otherwise parent node
  const nextSiblingOrParent = node.nextSibling || node.parentNode;
  // Remove the node from its parent
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
  return nextSiblingOrParent;
}

module.exports = removeNodeAndGetNextSiblingOrParent;