/**
 * Determines whether a given DOM node is the same as, or an ancestor of, another node.
 *
 * Traverses up the DOM tree from the target node and checks if any ancestor matches the reference node.
 *
 * @param {Node} referenceNode - The DOM node to check against (potential ancestor or self).
 * @param {Node} targetNode - The DOM node from which to start traversing up the DOM tree.
 * @returns {boolean} True if referenceNode is the same as or an ancestor of targetNode; otherwise, false.
 */
function isNodeOrAncestor(referenceNode, targetNode) {
  // Traverse up the DOM tree from targetNode
  while (targetNode) {
    // If the current node matches the reference node, return true
    if (referenceNode === targetNode) {
      return true;
    }
    // Move up to the parent node
    targetNode = targetNode.parentNode;
  }
  // If no match was found, return false
  return false;
}

module.exports = isNodeOrAncestor;