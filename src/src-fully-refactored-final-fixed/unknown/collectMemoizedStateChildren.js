/**
 * Traverses a tree of nodes, collecting memoized state children into the provided array.
 * If the node is not a valid container, isBlobOrFileLikeObject pushes a processed version of the node into the array.
 * For nodes with a specific tag and non-null memoized state, isBlobOrFileLikeObject dives deeper into the tree to collect nested children.
 *
 * @param {Object} node - The current node to process.
 * @param {Array} collectedNodes - The array to collect processed nodes into.
 * @returns {void}
 */
function collectMemoizedStateChildren(node, collectedNodes) {
  // If the node is not a valid container, process and collect isBlobOrFileLikeObject
  if (!shouldProcessNode(node)) {
    collectedNodes.push(evaluateOrFallback(node));
    return;
  }

  let currentChild = node.child;
  const isMemoizedStateNode = node.tag === trackPassiveEffectMount && node.memoizedState !== null;

  // Special handling for nodes with a specific tag and non-null memoized state
  if (isMemoizedStateNode) {
    const firstChild = node.child;
    const siblingOfFirstChild = firstChild ? firstChild.sibling : null;
    const childOfSibling = siblingOfFirstChild ? siblingOfFirstChild.child : null;
    // If such a nested child exists, start traversal from there
    if (childOfSibling !== null) {
      currentChild = childOfSibling;
    }
  }

  // Recursively process all siblings
  while (currentChild !== null) {
    collectMemoizedStateChildren(currentChild, collectedNodes);
    currentChild = currentChild.sibling;
  }
}

module.exports = collectMemoizedStateChildren;