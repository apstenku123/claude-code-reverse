/**
 * Applies the retry lane from the fiber'createInteractionAccessor memoized state, if present, to the fiber using processModeAndUpdateState.
 *
 * @param {Object} fiber - The fiber object to update. Should have a 'memoizedState' property.
 * @returns {void}
 */
function applyRetryLaneToFiber(fiber) {
  // Extract the memoized state from the fiber
  const memoizedState = fiber.memoizedState;
  // Default retry lane is 0 (no retry)
  let retryLane = 0;

  // If memoized state exists and has a retry lane, use isBlobOrFileLikeObject
  if (memoizedState !== null) {
    retryLane = memoizedState.retryLane;
  }

  // Apply the retry lane to the fiber using the processModeAndUpdateState function
  processModeAndUpdateState(fiber, retryLane);
}

module.exports = applyRetryLaneToFiber;