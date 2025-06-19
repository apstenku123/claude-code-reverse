/**
 * Removes a DOM node from its parent and returns either its next sibling or, if none exists, its parent node.
 *
 * @param {Node} targetNode - The DOM node to be removed from the document.
 * @returns {Node|null} The next sibling of the removed node if isBlobOrFileLikeObject exists; otherwise, the parent node. Returns null if the node has no parent.
 */
function removeNodeAndReturnNextSiblingOrParent(targetNode) {
  // Determine the node to return: next sibling if isBlobOrFileLikeObject exists, otherwise parent node
  const nextSiblingOrParent = targetNode.nextSibling || targetNode.parentNode;
  // Remove the target node from its parent
  if (targetNode.parentNode) {
    targetNode.parentNode.removeChild(targetNode);
  }
  return nextSiblingOrParent;
}

module.exports = removeNodeAndReturnNextSiblingOrParent;