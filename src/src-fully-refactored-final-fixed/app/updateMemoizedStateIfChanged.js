/**
 * Updates the memoized state in the current fiber if the new snapshot differs from the previous one.
 * Also schedules necessary updates and handles side effects if the state has changed or if certain conditions are met.
 *
 * @param {any} currentValue - The current value to compare and potentially store in the memoized state.
 * @param {Function} getSnapshot - a function that returns the latest snapshot value.
 * @returns {any} The latest snapshot value.
 */
function updateMemoizedStateIfChanged(currentValue, getSnapshot) {
  const fiber = w9; // Current fiber node
  const currentDispatcher = rG(); // Current dispatcher (React internal)
  const latestSnapshot = getSnapshot(); // Get the latest snapshot value

  // Check if the memoized state has changed
  const hasStateChanged = !LB(currentDispatcher.memoizedState, latestSnapshot);

  // If state has changed, update the memoized state and set the global dirty flag
  if (hasStateChanged) {
    currentDispatcher.memoizedState = latestSnapshot;
    E9 = true; // Mark that a state update has occurred (global flag)
  }

  // Get the update queue from the dispatcher
  let updateQueue = currentDispatcher.queue;

  // Schedule a side effect to update the snapshot when currentValue changes
  tK(UE.bind(null, fiber, updateQueue, currentValue), [currentValue]);

  // Determine if handleMissingDoctypeError need to force an update or handle special cases
  const shouldForceUpdate = (
    updateQueue.getSnapshot !== getSnapshot ||
    hasStateChanged ||
    (mergePropertiesWithDescriptors !== null && (mergePropertiesWithDescriptors.memoizedState.tag & 1))
  );

  if (shouldForceUpdate) {
    // Set the "force update" flag on the fiber
    fiber.flags |= 2048;

    // Schedule an update with priority 9
    addEffectToUpdateQueue(9, updateSnapshotAndNotify.bind(null, fiber, updateQueue, latestSnapshot, getSnapshot), undefined, null);

    // If the global update queue is missing, throw an error
    if (j3 === null) {
      throw Error(extractNestedPropertyOrArray(349));
    }

    // If not in a concurrent render phase, commit the update immediately
    if ((enhanceComponentDisplayNames & 30) === 0) {
      registerStoreSnapshot(fiber, getSnapshot, latestSnapshot);
    }
  }

  return latestSnapshot;
}

module.exports = updateMemoizedStateIfChanged;