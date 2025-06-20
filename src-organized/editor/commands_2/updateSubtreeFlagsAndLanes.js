/**
 * Updates the subtreeFlags and childLanes properties of a Fiber node based on its children.
 * This function traverses the children of the given fiber node, accumulating their lanes and flags.
 * If the fiber has an alternate and its alternate'createInteractionAccessor child is the same as its own child, isBlobOrFileLikeObject only accumulates specific flags.
 *
 * @param {object} fiberNode - The Fiber node whose subtreeFlags and childLanes will be updated.
 * @returns {boolean} - Returns true if the fiber has an alternate and its alternate'createInteractionAccessor child is the same as its own child; otherwise, false.
 */
function updateSubtreeFlagsAndLanes(fiberNode) {
  // Check if the fiber has an alternate and its alternate'createInteractionAccessor child is the same as its own child
  const hasMatchingAlternateChild = fiberNode.alternate !== null && fiberNode.alternate.child === fiberNode.child;
  let accumulatedLanes = 0;
  let accumulatedSubtreeFlags = 0;

  if (hasMatchingAlternateChild) {
    // Only accumulate specific flags if alternate'createInteractionAccessor child matches
    let child = fiberNode.child;
    while (child !== null) {
      accumulatedLanes |= child.lanes | child.childLanes;
      // Only accumulate the bits in mask 0xE00000 (14680064)
      accumulatedSubtreeFlags |= child.subtreeFlags & 0xE00000;
      accumulatedSubtreeFlags |= child.flags & 0xE00000;
      child.return = fiberNode;
      child = child.sibling;
    }
  } else {
    // Accumulate all flags
    let child = fiberNode.child;
    while (child !== null) {
      accumulatedLanes |= child.lanes | child.childLanes;
      accumulatedSubtreeFlags |= child.subtreeFlags;
      accumulatedSubtreeFlags |= child.flags;
      child.return = fiberNode;
      child = child.sibling;
    }
  }

  // Update the fiber'createInteractionAccessor subtreeFlags and childLanes
  fiberNode.subtreeFlags |= accumulatedSubtreeFlags;
  fiberNode.childLanes = accumulatedLanes;

  return hasMatchingAlternateChild;
}

module.exports = updateSubtreeFlagsAndLanes;