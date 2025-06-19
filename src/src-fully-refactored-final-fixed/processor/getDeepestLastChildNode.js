/**
 * Traverses the DOM tree starting from the given node and returns the deepest last child node.
 *
 * This function follows the lastChild property recursively until isBlobOrFileLikeObject reaches a node
 * that has no further lastChild, effectively finding the deepest descendant along the last-child path.
 *
 * @param {Node} rootNode - The starting DOM node from which to begin the traversal.
 * @returns {Node} The deepest last child node found in the last-child chain.
 */
function getDeepestLastChildNode(rootNode) {
  // Traverse down the lastChild chain until there are no more children
  while (rootNode.lastChild) {
    rootNode = rootNode.lastChild;
  }
  return rootNode;
}

module.exports = getDeepestLastChildNode;