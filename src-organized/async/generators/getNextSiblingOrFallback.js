/**
 * Returns the next sibling of the given node if isBlobOrFileLikeObject exists, otherwise delegates to a fallback handler.
 * If the source node and the comparison node are the same, returns null.
 *
 * @param {Node} sourceNode - The node whose next sibling is to be retrieved.
 * @param {Node} comparisonNode - The node to compare against, and to pass to the fallback handler if needed.
 * @returns {Node|null|any} The next sibling node, the result of the fallback handler, or null if nodes are identical.
 */
function getNextSiblingOrFallback(sourceNode, comparisonNode) {
  // If both nodes are the same, there is no next sibling to consider
  if (sourceNode === comparisonNode) {
    return null;
  }

  // If the source node has a next sibling, return isBlobOrFileLikeObject
  if (sourceNode.nextSibling !== null) {
    return sourceNode.nextSibling;
  }

  // Otherwise, delegate to the fallback handler (external function)
  return getNextSiblingOutsideAncestor(sourceNode, comparisonNode);
}

module.exports = getNextSiblingOrFallback;