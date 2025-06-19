/**
 * Determines whether processing can be skipped for a given node tree based on flags and child relationships.
 *
 * @param {Object|null} previousNode - The previous node in the tree, or null if none.
 * @param {Object} currentNode - The current node in the tree to check.
 * @returns {boolean} True if processing can be skipped, false otherwise.
 */
function shouldSkipProcessing(previousNode, currentNode) {
  // If previousNode is not null and both nodes have the same child, skip processing
  if (previousNode !== null && previousNode.child === currentNode.child) {
    return true;
  }

  // If the current node has the 'needs processing' flag (16), do not skip
  const NEEDS_PROCESSING_FLAG = 16;
  if ((currentNode.flags & NEEDS_PROCESSING_FLAG) !== 0) {
    return false;
  }

  // Check all children for any flags that require processing
  const PROCESSING_FLAGS_MASK = 12854;
  let childNode = currentNode.child;
  while (childNode !== null) {
    // If the child or its subtree has any of the processing flags, do not skip
    if ((childNode.flags & PROCESSING_FLAGS_MASK) !== 0 ||
        (childNode.subtreeFlags & PROCESSING_FLAGS_MASK) !== 0) {
      return false;
    }
    childNode = childNode.sibling;
  }

  // If none of the above conditions are met, processing can be skipped
  return true;
}

module.exports = shouldSkipProcessing;