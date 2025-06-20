/**
 * Returns the deepest last child of the previous sibling of a given DOM node, 
 * or the parent node if certain conditions are met.
 *
 * @param {Node} currentNode - The DOM node whose previous sibling or parent is being checked.
 * @param {Node} stopNode - The DOM node at which to stop traversing up the tree.
 * @returns {Node|null} The deepest last child of the previous sibling, the parent node, or null if the parent is the stopNode.
 */
function getPreviousOrParentNode(currentNode, stopNode) {
  // Get the previous sibling of the current node
  const previousSibling = currentNode.previousSibling;
  if (previousSibling !== null) {
    // If there is a previous sibling, return its deepest last child
    return getDeepestLastChild(previousSibling);
  }
  // If there is no previous sibling, get the parent node
  const parentNode = currentNode.parentNode;
  // If the parent node is the stopNode, return null
  if (parentNode === stopNode) {
    return null;
  }
  // Otherwise, return the parent node
  return parentNode;
}

module.exports = getPreviousOrParentNode;