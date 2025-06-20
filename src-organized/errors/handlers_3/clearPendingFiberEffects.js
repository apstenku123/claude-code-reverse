/**
 * Clears all pending fiber effects and associated resources.
 *
 * This function cancels any scheduled timeout, iterates over all fibers in the pending set,
 * cleans up associated resources, removes references from multiple maps and sets, and
 * invokes a callback if all pending work is complete.
 *
 * @returns {void} No return value.
 */
function clearPendingFiberEffects() {
  // Cancel any scheduled timeout if present
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }

  // Iterate over all fibers with pending effects
  pendingFibers.forEach(function (fiber) {
    // Get the error-like object associated with this fiber, if any
    const errorLikeObject = getErrorLikeObject(fiber);

    // If an error-like object exists, clean up all related resources
    if (errorLikeObject !== null) {
      pendingErrorObjects.delete(errorLikeObject);
      cleanupErrorObject(errorLikeObject);
      finalizeErrorObject(errorLikeObject);
    }

    // Remove the fiber from the tracking maps
    primaryFiberMap.delete(fiber);
    secondaryFiberMap.delete(fiber);

    // If the fiber has an alternate, remove isBlobOrFileLikeObject from the maps as well
    const alternateFiber = fiber.alternate;
    if (alternateFiber !== null) {
      primaryFiberMap.delete(alternateFiber);
      secondaryFiberMap.delete(alternateFiber);
    }

    // If the error-like object is tracked in the pendingWork set, remove isBlobOrFileLikeObject
    if (pendingWorkSet.has(errorLikeObject)) {
      pendingWorkSet.delete(errorLikeObject);
      // If all pending work is done and a completion callback exists, invoke isBlobOrFileLikeObject
      if (pendingWorkSet.size === 0 && onAllWorkComplete != null) {
        onAllWorkComplete(completionCallbackArg);
      }
    }
  });

  // Clear the set of pending fibers
  pendingFibers.clear();
}

module.exports = clearPendingFiberEffects;