/**
 * Processes any pending operations if available; otherwise, processes all fiber roots.
 *
 * If there are pending operations (stored in pendingOperations), emits them via the event emitter.
 * If not, and if a certain condition is met, sets a flag and processes all fiber roots by collecting their change descriptions,
 * durations, and other metadata, then emits or stores this information as needed.
 *
 * @returns {void} Does not return a value.
 */
function processPendingOperationsOrRoots() {
  // Store and clear the current pending operations
  const operationsToProcess = pendingOperations;
  pendingOperations = null;

  // If there are operations to process, emit each one
  if (operationsToProcess !== null && operationsToProcess.length > 0) {
    operationsToProcess.forEach(function (operation) {
      eventEmitter.emit("operations", operation);
    });
  } else {
    // If there are no operations, and if a certain condition is met, set a flag
    if (mountHasOccurred !== null) {
      hasLegacyHooks = true;
    }

    // Process all fiber roots
    eventEmitter.getFiberRoots(rendererID).forEach(function (fiberRoot) {
      // Get the current fiber node
      let currentFiberNode = fiberRoot.current;
      // Compute the node handle
      let nodeHandle = getNodeHandle(currentFiberNode);
      // Update equality state for the node
      updateEqualityState(nodeHandle, currentFiberNode);

      // If profiling is enabled and this is a profiling root, prepare profiling data
      if (isProfilingEnabled && isProfilingRoot(fiberRoot)) {
        profilingData = {
          changeDescriptions: isChangeTrackingEnabled ? new Map() : null,
          durations: [],
          commitTime: getCurrentTime() - lastCommitTime,
          maxActualDuration: 0,
          priorityLevel: null,
          updaters: getUpdatersForRoot(fiberRoot),
          effectDuration: null,
          passiveEffectDuration: null
        };
      }

      // Traverse the fiber tree and process effects
      traverseFiberTree(currentFiberNode, null, false, false);
      // Process and flush the interaction queue
      processAndFlushInteractionQueue(fiberRoot);
      // Reset node handle
      nodeHandle = -1;
    });
  }
}

module.exports = processPendingOperationsOrRoots;