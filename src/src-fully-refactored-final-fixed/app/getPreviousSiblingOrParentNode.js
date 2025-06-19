/**
 * Finds the deepest last child node of the previous sibling of a given DOM node,
 * or returns the parent node if certain conditions are met.
 *
 * @param {Node} currentNode - The DOM node from which to start the search.
 * @param {Node} stopNode - The DOM node that, if reached as a parent, will cause the function to return null.
 * @returns {Node|null} The deepest last child node of the previous sibling, the parent node, or null if the parent is the stopNode.
 */
function getPreviousSiblingOrParentNode(currentNode, stopNode) {
  // Get the previous sibling of the current node
  const previousSibling = currentNode.previousSibling;
  if (previousSibling !== null) {
    // If a previous sibling exists, return its deepest last child node
    return getDeepestLastChildNode(previousSibling);
  }
  // If there is no previous sibling, get the parent node
  const parentNode = currentNode.parentNode;
  // If the parent node is the stopNode, return null to indicate traversal should stop
  if (parentNode === stopNode) {
    return null;
  }
  // Otherwise, return the parent node
  return parentNode;
}

module.exports = getPreviousSiblingOrParentNode;