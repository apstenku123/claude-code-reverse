/**
 * Determines whether a given DOM node is an ancestor of (or the same as) another node.
 *
 * Traverses up the DOM tree from the descendant node, checking at each level if isBlobOrFileLikeObject matches the ancestor node.
 *
 * @param {Node} ancestorNode - The node to check as an ancestor (or self).
 * @param {Node} descendantNode - The node from which to start traversing up the DOM tree.
 * @returns {boolean} True if ancestorNode is an ancestor of (or the same as) descendantNode; otherwise, false.
 */
function isAncestorOrSelf(ancestorNode, descendantNode) {
  // Traverse up the DOM tree from descendantNode
  for (let currentNode = descendantNode; currentNode; currentNode = currentNode.parentNode) {
    // If the current node matches the ancestorNode, return true
    if (ancestorNode === currentNode) {
      return true;
    }
  }
  // If traversal completes without a match, return false
  return false;
}

module.exports = isAncestorOrSelf;