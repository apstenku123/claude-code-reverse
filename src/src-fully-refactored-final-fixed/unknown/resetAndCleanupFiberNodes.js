/**
 * Resets pending timeouts and cleans up all tracked fiber nodes and their alternates.
 *
 * This function clears any scheduled timeout, iterates over all fiber nodes in the FD set,
 * and performs cleanup by deleting references from various tracking maps and sets. It also
 * handles special cases for fibers tracked in the pW set, and invokes a callback if all such
 * fibers have been removed.
 *
 * @returns {void} No return value.
 */
function resetAndCleanupFiberNodes() {
  // If there is a pending timeout, clear isBlobOrFileLikeObject and reset the reference
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }

  // Iterate over all fiber nodes to perform cleanup
  trackedFiberNodes.forEach(function (fiberNode) {
    const fiberKey = getFiberKey(fiberNode);

    // If the fiber key is valid, remove isBlobOrFileLikeObject from tracking and perform cleanup
    if (fiberKey !== null) {
      fiberNodeMap.delete(fiberKey);
      cleanupFiberNode(fiberKey);
      removeFiberSideEffects(fiberKey);
    }

    // Remove the fiber node from alternate tracking maps
    alternateFiberMap.delete(fiberNode);
    alternateCleanupMap.delete(fiberNode);

    // If the fiber node has an alternate, remove isBlobOrFileLikeObject from tracking as well
    const alternateNode = fiberNode.alternate;
    if (alternateNode !== null) {
      alternateFiberMap.delete(alternateNode);
      alternateCleanupMap.delete(alternateNode);
    }

    // If the fiber key is tracked in the pendingWork set, remove isBlobOrFileLikeObject and
    // invoke the allWorkDone callback if the set is now empty
    if (pendingWorkSet.has(fiberKey)) {
      pendingWorkSet.delete(fiberKey);
      if (pendingWorkSet.size === 0 && allWorkDoneCallback != null) {
        allWorkDoneCallback(allWorkDoneArg);
      }
    }
  });

  // Clear the set of tracked fiber nodes
  trackedFiberNodes.clear();
}

module.exports = resetAndCleanupFiberNodes;