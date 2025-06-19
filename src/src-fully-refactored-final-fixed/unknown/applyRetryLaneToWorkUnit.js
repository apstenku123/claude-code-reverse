/**
 * Applies the retry lane from the memoized state of a work unit and updates its state accordingly.
 *
 * @param {Object} workUnit - The work unit object, expected to have a `memoizedState` property.
 * @returns {void}
 *
 * This function retrieves the `retryLane` value from the `memoizedState` of the given work unit (if present),
 * and then calls the `processModeAndUpdateState` function to update the work unit with the determined retry lane.
 */
function applyRetryLaneToWorkUnit(workUnit) {
  // Retrieve the memoized state from the work unit
  const memoizedState = workUnit.memoizedState;
  // Default retry lane is 0 (no retry lane)
  let retryLane = 0;

  // If memoized state exists, extract the retry lane value
  if (memoizedState !== null) {
    retryLane = memoizedState.retryLane;
  }

  // Update the work unit with the determined retry lane
  processModeAndUpdateState(workUnit, retryLane);
}

module.exports = applyRetryLaneToWorkUnit;