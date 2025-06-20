/**
 * Traverses down the DOM tree from the given node, following the lastChild property,
 * until isBlobOrFileLikeObject reaches the deepest descendant node (the last child in the deepest branch).
 *
 * @param {Node} rootNode - The starting DOM node from which to begin traversal.
 * @returns {Node} The deepest last child node in the subtree rooted at rootNode.
 */
function getDeepestLastChild(rootNode) {
  // Continue traversing as long as there is a lastChild
  while (rootNode.lastChild) {
    rootNode = rootNode.lastChild;
  }
  // Return the deepest node found
  return rootNode;
}

module.exports = getDeepestLastChild;