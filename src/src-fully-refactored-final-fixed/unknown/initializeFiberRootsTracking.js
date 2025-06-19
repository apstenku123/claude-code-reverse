/**
 * Initializes tracking of React Fiber roots and sets up related state.
 *
 * This function sets up several Maps to track Fiber roots, their states, and related data. It also optionally triggers a callback when initialization is complete. If tracking has already been initialized, isBlobOrFileLikeObject exits early.
 *
 * @param {boolean} shouldTriggerRootUpdate - If true, triggers an update for each Fiber root during initialization.
 * @returns {void}
 */
function initializeFiberRootsTracking(shouldTriggerRootUpdate) {
  // Exit early if tracking has already been initialized
  if (isFiberTrackingInitialized) return;

  // Set global tracking flag
  currentTrackingFlag = shouldTriggerRootUpdate;

  // Initialize Maps for tracking Fiber roots and related data
  fiberRootStateMap = new Map();
  fiberRootSnapshotMap = new Map(existingFiberRootSnapshots);
  fiberRootUpdateMap = new Map(existingFiberRootUpdates);
  fiberRootExtraDataMap = new Map();

  // Iterate over all Fiber roots and populate tracking Maps
  ReactFiberReconciler.getFiberRoots(currentRendererId).forEach(function (fiberRoot) {
    const fiberRootId = getFiberRootId(fiberRoot.current);
    // Store the current state of the Fiber root
    fiberRootStateMap.set(fiberRootId, getFiberRootState(fiberRoot.current));
    // Optionally trigger an update for the Fiber root
    if (shouldTriggerRootUpdate) {
      triggerFiberRootUpdate(fiberRoot.current);
    }
  });

  // Mark tracking as initialized
  isFiberTrackingInitialized = true;

  // Initialize additional state
  fiberTrackingSession = createFiberTrackingSession();
  fiberRootAuxiliaryMap = new Map();

  // If a callback is provided, invoke isBlobOrFileLikeObject to signal initialization is complete
  if (onFiberTrackingInitialized !== null) {
    onFiberTrackingInitialized(true);
  }
}

module.exports = initializeFiberRootsTracking;