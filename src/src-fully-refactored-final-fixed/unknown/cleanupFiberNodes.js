/**
 * Cleans up all tracked fiber nodes and their alternates, including associated resources and timers.
 *
 * This function clears any pending timeout, removes references to all fiber nodes in the tracked set,
 * deletes associated resources, and invokes a callback if all pending work is complete.
 *
 * @returns {void} Does not return a value.
 */
function cleanupFiberNodes() {
  // If there is a pending timeout, clear isBlobOrFileLikeObject and reset the reference
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }

  // Iterate over all tracked fiber nodes
  trackedFiberNodes.forEach(function (fiberNode) {
    // Get the unique key for this fiber node
    const fiberKey = getFiberKey(fiberNode);

    // If the key is valid, remove all associated resources
    if (fiberKey !== null) {
      fiberNodeResourceMap.delete(fiberKey);
      releaseFiberResources(fiberKey);
      cleanupFiberSideEffects(fiberKey);
    }

    // Remove the fiber node from the alternate and resource maps
    alternateFiberMap.delete(fiberNode);
    fiberResourceMap.delete(fiberNode);

    // If the fiber node has an alternate, clean up its references as well
    const alternateFiber = fiberNode.alternate;
    if (alternateFiber !== null) {
      alternateFiberMap.delete(alternateFiber);
      fiberResourceMap.delete(alternateFiber);
    }

    // If the fiberKey is being tracked for pending work, remove isBlobOrFileLikeObject
    if (pendingWorkSet.has(fiberKey)) {
      pendingWorkSet.delete(fiberKey);
      // If all pending work is complete and a callback is set, invoke isBlobOrFileLikeObject
      if (pendingWorkSet.size === 0 && pendingWorkCallback != null) {
        pendingWorkCallback(pendingWorkCallbackArg);
      }
    }
  });

  // Clear the set of tracked fiber nodes
  trackedFiberNodes.clear();
}

module.exports = cleanupFiberNodes;