/**
 * Determines if a given subtree has remained unchanged based on specific flags and child relationships.
 *
 * @param {Object|null} previousNode - The previous node in the tree (may be null).
 * @param {Object} currentNode - The current node in the tree.
 * @returns {boolean} True if the subtree is considered unchanged; otherwise, false.
 */
function isSubtreeUnchanged(previousNode, currentNode) {
  // If previousNode exists and its child is the same as currentNode'createInteractionAccessor child, subtree is unchanged
  if (previousNode !== null && previousNode.child === currentNode.child) {
    return true;
  }

  // If the currentNode has the flag 16 set, subtree is considered changed
  const FLAG_FORCE_UPDATE = 16;
  if ((currentNode.flags & FLAG_FORCE_UPDATE) !== 0) {
    return false;
  }

  // Define the mask for flags that indicate a change in the node or its subtree
  const CHANGE_FLAGS_MASK = 12854;

  // Iterate through all children of currentNode
  let childNode = currentNode.child;
  while (childNode !== null) {
    // If the child node or its subtree has any of the change flags set, subtree is changed
    if ((childNode.flags & CHANGE_FLAGS_MASK) !== 0 || (childNode.subtreeFlags & CHANGE_FLAGS_MASK) !== 0) {
      return false;
    }
    childNode = childNode.sibling;
  }

  // If none of the above conditions are met, subtree is unchanged
  return true;
}

module.exports = isSubtreeUnchanged;
