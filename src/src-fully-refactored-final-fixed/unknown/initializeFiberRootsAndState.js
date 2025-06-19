/**
 * Initializes internal state and caches for fiber roots, and triggers optional callbacks.
 *
 * This function sets up several Maps to track fiber roots and related data structures.
 * It also optionally processes each fiber root and triggers a callback if provided.
 *
 * @param {boolean} shouldProcessRoots - If true, processes each fiber root with traverseAndProcessTree.
 * @returns {void}
 */
function initializeFiberRootsAndState(shouldProcessRoots) {
  // If already initialized, exit early
  if (isInitialized) return;

  // Set the initialization flag and prepare caches
  initializationFlag = shouldProcessRoots;
  fiberRootCache = new Map();
  epCache = new Map(existingEpCache);
  upCache = new Map(existingUpCache);
  instanceCache = new Map();

  // Iterate over all fiber roots and cache their current state
  fiberRootRegistry.getFiberRoots(environmentKey).forEach(function (fiberRoot) {
    const fiberRootId = getFiberRootId(fiberRoot.current);
    // Cache the result of getGy for the current fiber root
    fiberRootCache.set(fiberRootId, getGy(fiberRoot.current));
    // Optionally process the fiber root if shouldProcessRoots is true
    if (shouldProcessRoots) {
      processFiberRoot(fiberRoot.current);
    }
  });

  // Mark as initialized
  isInitialized = true;

  // Initialize snapshot state
  snapshotState = getFreshSnapshotState();
  // Prepare a new map for tracking hooks
  hooksCache = new Map();

  // If a callback is registered, invoke isBlobOrFileLikeObject with true
  if (onInitializedCallback !== null) {
    onInitializedCallback(true);
  }
}

module.exports = initializeFiberRootsAndState;