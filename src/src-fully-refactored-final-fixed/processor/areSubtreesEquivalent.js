/**
 * Determines if two tree nodes (and their subtrees) are considered equivalent based on their child references and flag values.
 *
 * This function is typically used to optimize tree processing by checking if a subtree can be skipped.
 *
 * @param {Object|null} previousNode - The previous tree node to compare against.
 * @param {Object} currentNode - The current tree node to check for equivalence.
 * @returns {boolean} True if the subtrees are equivalent and can be skipped; false otherwise.
 */
function areSubtreesEquivalent(previousNode, currentNode) {
  // If both nodes are non-null and their child references are the same, they are equivalent
  if (previousNode !== null && previousNode.child === currentNode.child) {
    return true;
  }

  // If the current node has the 'force update' flag (16), subtrees are not equivalent
  const FORCE_UPDATE_FLAG = 16;
  if ((currentNode.flags & FORCE_UPDATE_FLAG) !== 0) {
    return false;
  }

  // Check all children for significant flags that would prevent equivalence
  const SIGNIFICANT_FLAGS = 12854;
  let childNode = currentNode.child;
  while (childNode !== null) {
    // If this child or its subtree has significant flags, subtrees are not equivalent
    if ((childNode.flags & SIGNIFICANT_FLAGS) !== 0 || (childNode.subtreeFlags & SIGNIFICANT_FLAGS) !== 0) {
      return false;
    }
    childNode = childNode.sibling;
  }

  // If none of the above checks failed, the subtrees are equivalent
  return true;
}

module.exports = areSubtreesEquivalent;