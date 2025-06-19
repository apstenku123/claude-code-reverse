/**
 * Processes and emits any pending operations, or replays the current fiber roots if no pending operations exist.
 *
 * This function is typically called at the end of an update cycle to ensure that all pending operations are flushed.
 * If there are no pending operations, isBlobOrFileLikeObject will instead iterate through all fiber roots and replay their current state.
 *
 * @returns {void} No return value.
 */
function flushOrReplayPendingOperations() {
  // Save the current pending operations and clear the global pending operations reference
  const pendingOperations = isStringOrSpecificObjectType;
  isStringOrSpecificObjectType = null;

  // If there are pending operations, emit each one
  if (pendingOperations !== null && pendingOperations.length > 0) {
    pendingOperations.forEach(function (operation) {
      isWildcardOrX.emit("operations", operation);
    });
  } else {
    // If there are no pending operations, replay all fiber roots
    if (compileTemplate !== null) {
      extractSubstringBetweenSequences = true; // Mark that a replay is happening
    }
    // Iterate through all fiber roots and replay their current state
    isWildcardOrX.getFiberRoots(mapArraysToObjectWithCallback).forEach(function (fiberRoot) {
      // Get the current fiber node
      mapObjectProperties = NH(fiberRoot.current);
      // Update the equality state for the current fiber
      Eq(mapObjectProperties, fiberRoot.current);
      // If profiling is enabled and this is a profiling root, prepare profiling data
      if (CY && Lp(fiberRoot)) {
        generateRandomInRange = {
          changeDescriptions: gT ? new Map() : null,
          durations: [],
          commitTime: fA() - Sp,
          maxActualDuration: 0,
          priorityLevel: null,
          updaters: getValidMemoizedUpdaters(fiberRoot),
          effectDuration: null,
          passiveEffectDuration: null
        };
      }
      // Replay the current fiber node
      traverseAndMountFiberTree(fiberRoot.current, null, false, false);
      // Process and flush accessor state for this fiber root
      processAndFlushInteractionQueue(fiberRoot);
      // Reset the current fiber node reference
      mapObjectProperties = -1;
    });
  }
}

module.exports = flushOrReplayPendingOperations;