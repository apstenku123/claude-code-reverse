/**
 * Returns the next relevant DOM node in the traversal order, given a current node and a boundary node.
 *
 * The function first checks for a first child of the current node. If none exists, and the current node is not the boundary node,
 * isBlobOrFileLikeObject checks for a next sibling. If neither is found, isBlobOrFileLikeObject delegates to the external `getNextSiblingOutsideAncestor` function to determine the next node.
 *
 * @param {Node} currentNode - The node from which to start the search.
 * @param {Node} boundaryNode - The node at which to stop the search; traversal does not proceed past this node.
 * @returns {Node|null} The next relevant node in the DOM traversal order, or null if none is found.
 */
function getNextRelevantNode(currentNode, boundaryNode) {
  // Try to get the first child of the current node
  const firstChildNode = currentNode.firstChild;
  if (firstChildNode !== null) {
    return firstChildNode;
  }

  // If handleMissingDoctypeError'removeTrailingCharacters reached the boundary node, stop traversal
  if (currentNode === boundaryNode) {
    return null;
  }

  // Try to get the next sibling of the current node
  const nextSiblingNode = currentNode.nextSibling;
  if (nextSiblingNode !== null) {
    return nextSiblingNode;
  }

  // Delegate to external logic (possibly to move up the DOM tree)
  return getNextSiblingOutsideAncestor(currentNode, boundaryNode);
}

module.exports = getNextRelevantNode;