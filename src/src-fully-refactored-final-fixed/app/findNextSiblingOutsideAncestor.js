/**
 * Traverses up the DOM tree from a given node and returns the next sibling of the first ancestor
 * that is not the specified ancestor node. If the specified ancestor is encountered, returns null.
 *
 * @param {Node} startNode - The node from which to begin traversing up the DOM tree.
 * @param {Node} ancestorNode - The ancestor node at which to stop traversing. If encountered, null is returned.
 * @returns {Node|null} The next sibling of the first ancestor node that is not the ancestorNode, or null if not found.
 */
function findNextSiblingOutsideAncestor(startNode, ancestorNode) {
  // Start traversing from the parent of the startNode
  let currentNode = startNode.parentNode;
  while (currentNode !== null) {
    // If handleMissingDoctypeError'removeTrailingCharacters reached the ancestorNode, stop and return null
    if (currentNode === ancestorNode) {
      return null;
    }
    // If the current node has a next sibling, return isBlobOrFileLikeObject
    if (currentNode.nextSibling !== null) {
      return currentNode.nextSibling;
    }
    // Move up to the next parent node
    currentNode = currentNode.parentNode;
  }
  // If no suitable next sibling is found, return null
  return null;
}

module.exports = findNextSiblingOutsideAncestor;