/**
 * Initializes and caches the state of all Fiber roots for the current renderer.
 * This function sets up several Maps to track fiber roots, their states, and related data.
 * It only runs once per session, guarded by the `isFiberRootsInitialized` flag.
 *
 * @param {boolean} shouldTriggerUpdate - If true, triggers an update for each fiber root.
 * @returns {void}
 */
function initializeFiberRootsState(shouldTriggerUpdate) {
  // Prevent re-initialization if already done
  if (isFiberRootsInitialized) return;

  // Set global flag for update triggering
  isUpdateTriggerEnabled = shouldTriggerUpdate;

  // Initialize Maps for tracking fiber roots and related data
  fiberRootStateMap = new Map();
  fiberRootSnapshotMap = new Map(existingFiberRootSnapshots);
  fiberRootUpdateMap = new Map(existingFiberRootUpdates);
  fiberRootExtraDataMap = new Map();

  // Iterate over all fiber roots for the current renderer
  renderer.getFiberRoots(currentRendererId).forEach(function (fiberRoot) {
    const fiberRootId = getFiberRootId(fiberRoot.current);
    // Cache the state of the current fiber root
    fiberRootStateMap.set(fiberRootId, getFiberRootState(fiberRoot.current));
    // Optionally trigger an update for the current fiber root
    if (shouldTriggerUpdate) {
      triggerFiberRootUpdate(fiberRoot.current);
    }
  });

  // Mark initialization as complete
  isFiberRootsInitialized = true;

  // Initialize additional state
  fiberRootSnapshotTimestamp = getCurrentTimestamp();
  fiberRootExtraStateMap = new Map();

  // If an accessor callback is defined, invoke isBlobOrFileLikeObject
  if (fiberRootAccessorCallback !== null) {
    fiberRootAccessorCallback(true);
  }
}

module.exports = initializeFiberRootsState;