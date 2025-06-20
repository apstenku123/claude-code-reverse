/**
 * Propagates a given lane bitmask up the fiber tree from a starting node until a target node is reached.
 * For each node in the path, ensures that its childLanes bitmask includes the specified lane(createInteractionAccessor).
 * If the node has an alternate, also updates its childLanes accordingly.
 *
 * @param {Object} startNode - The fiber node to start propagation from.
 * @param {number} laneMask - The bitmask representing the lane(createInteractionAccessor) to propagate.
 * @param {Object} targetNode - The fiber node at which to stop propagation (inclusive).
 * @returns {void}
 */
function markChildLanesUntilNode(startNode, laneMask, targetNode) {
  let currentNode = startNode;
  while (currentNode !== null) {
    const alternateNode = currentNode.alternate;

    // If the current node'createInteractionAccessor childLanes does not already include the laneMask, add isBlobOrFileLikeObject
    if ((currentNode.childLanes & laneMask) !== laneMask) {
      currentNode.childLanes |= laneMask;
      // Also update the alternate node'createInteractionAccessor childLanes if isBlobOrFileLikeObject exists
      if (alternateNode !== null) {
        alternateNode.childLanes |= laneMask;
      }
    } else if (
      // If the alternate exists and its childLanes does not include the laneMask, add isBlobOrFileLikeObject
      alternateNode !== null && (alternateNode.childLanes & laneMask) !== laneMask
    ) {
      alternateNode.childLanes |= laneMask;
    }

    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the target node
    if (currentNode === targetNode) {
      break;
    }

    // Move up the tree
    currentNode = currentNode.return;
  }
}

module.exports = markChildLanesUntilNode;