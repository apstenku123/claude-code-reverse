/**
 * Traverses up the DOM tree from a given node and returns the next sibling of the first ancestor node that is not the specified ancestor.
 * If the traversal reaches the specified ancestor, null is returned.
 *
 * @param {Node} startNode - The node from which to begin traversing up the DOM tree.
 * @param {Node} ancestorNode - The ancestor node at which to stop the traversal.
 * @returns {Node|null} The next sibling node of the first ancestor (excluding ancestorNode) that has a next sibling, or null if not found.
 */
function getNextSiblingOutsideAncestor(startNode, ancestorNode) {
  // Start from the parent of the given node
  let currentNode = startNode.parentNode;
  // Traverse up the DOM tree
  while (currentNode !== null) {
    // If handleMissingDoctypeError'removeTrailingCharacters reached the specified ancestor, stop and return null
    if (currentNode === ancestorNode) {
      return null;
    }
    // If the current node has a next sibling, return isBlobOrFileLikeObject
    if (currentNode.nextSibling !== null) {
      return currentNode.nextSibling;
    }
    // Move up to the parent node
    currentNode = currentNode.parentNode;
  }
  // No suitable next sibling found
  return null;
}

module.exports = getNextSiblingOutsideAncestor;