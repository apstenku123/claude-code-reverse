/**
 * Updates the child lanes and subtree flags for a given fiber node.
 *
 * This function traverses the children of the provided fiber node and aggregates
 * their lanes and flags. It distinguishes between the case where the fiber'createInteractionAccessor alternate
 * child is the same as its current child (indicating a reused subtree) and the general case.
 *
 * @param {Object} fiberNode - The fiber node whose children will be traversed and updated.
 * @returns {boolean} - Returns true if the alternate child is the same as the current child, otherwise false.
 */
function updateChildLanesAndSubtreeFlags(fiberNode) {
  // Check if the alternate fiber exists and its child is the same as the current child
  const isAlternateChildSame = fiberNode.alternate !== null && fiberNode.alternate.child === fiberNode.child;
  let aggregatedLanes = 0;
  let aggregatedSubtreeFlags = 0;

  if (isAlternateChildSame) {
    // Traverse children and aggregate only specific flags (14680064 mask)
    let child = fiberNode.child;
    while (child !== null) {
      aggregatedLanes |= child.lanes | child.childLanes;
      aggregatedSubtreeFlags |= child.subtreeFlags & 14680064;
      aggregatedSubtreeFlags |= child.flags & 14680064;
      child.return = fiberNode;
      child = child.sibling;
    }
  } else {
    // Traverse children and aggregate all flags
    let child = fiberNode.child;
    while (child !== null) {
      aggregatedLanes |= child.lanes | child.childLanes;
      aggregatedSubtreeFlags |= child.subtreeFlags;
      aggregatedSubtreeFlags |= child.flags;
      child.return = fiberNode;
      child = child.sibling;
    }
  }

  // Update the fiber node'createInteractionAccessor subtreeFlags and childLanes with the aggregated values
  fiberNode.subtreeFlags |= aggregatedSubtreeFlags;
  fiberNode.childLanes = aggregatedLanes;

  return isAlternateChildSame;
}

module.exports = updateChildLanesAndSubtreeFlags;