/**
 * Determines if the memoized state of the first object has changed compared to the second,
 * but only if the first object passes a specific validation check.
 *
 * @param {Object} previousObject - The object representing the previous state. Must have a 'memoizedState' property.
 * @param {Object} nextObject - The object representing the next state. Must have a 'memoizedState' property.
 * @returns {boolean} Returns true if the memoized state has changed and the previous object passes the validation; otherwise, false.
 */
function hasMemoizedStateChanged(previousObject, nextObject) {
  const previousMemoizedState = previousObject.memoizedState;
  const nextMemoizedState = nextObject.memoizedState;

  // Only compare memoized states if the previous object passes the isQueueLikeObservable validation
  if (isQueueLikeObservable(previousObject)) {
    return previousMemoizedState !== nextMemoizedState;
  }
  // If validation fails, always return false
  return false;
}

module.exports = hasMemoizedStateChanged;