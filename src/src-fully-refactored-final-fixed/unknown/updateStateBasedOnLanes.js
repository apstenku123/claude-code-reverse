/**
 * Updates the state and lane flags of a work unit based on the current bitmask and memoized state.
 *
 * @param {Object} workUnit - The work unit object containing state and lane information.
 * @param {any} nextState - The next state to compare or assign.
 * @param {any} memoizedState - The memoized state to compare against.
 * @returns {any} - Returns the updated memoized state or the next state, depending on the logic.
 */
function updateStateBasedOnLanes(workUnit, nextState, memoizedState) {
  // If the global bitmask 'enhanceComponentDisplayNames' AND 21 is zero, reset baseState and set memoizedState
  if ((globalBitmask & 21) === 0) {
    if (workUnit.baseState) {
      workUnit.baseState = false;
      globalStateChanged = true;
    }
    workUnit.memoizedState = memoizedState;
    return workUnit.memoizedState;
  }

  // If the state comparison fails, update lanes and set baseState
  if (!areStatesEqual(memoizedState, nextState)) {
    const newLane = getNewLane();
    currentWork.lanes |= newLane;
    globalLanes |= newLane;
    workUnit.baseState = true;
    return nextState;
  }

  // If states are equal, return nextState as is
  return nextState;
}

module.exports = updateStateBasedOnLanes;