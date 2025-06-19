/**
 * Updates the state of a component based on certain conditions.
 *
 * This function checks a global flag and, depending on its value, either resets the base state
 * and updates the memoized state, or checks if the state has changed using a comparison function.
 * If the state has changed, isBlobOrFileLikeObject updates various global lane indicators and marks the base state as dirty.
 *
 * @param {Object} componentState - The state object for the component, containing baseState and memoizedState.
 * @param {any} nextState - The next state value to compare or assign.
 * @param {any} prevState - The previous state value to compare against.
 * @returns {any} Returns the updated state value, depending on the logic branch taken.
 */
function updateStateIfNeeded(componentState, nextState, prevState) {
  // Check if the global flag _globalFlag (originally enhanceComponentDisplayNames) with mask 21 is zero
  if ((globalFlag & 21) === 0) {
    // If baseState is truthy, reset isBlobOrFileLikeObject and set a global dirty flag
    if (componentState.baseState) {
      componentState.baseState = false;
      globalDirtyFlag = true; // E9 = true
    }
    // Update the memoized state and return
    componentState.memoizedState = prevState;
    return prevState;
  }

  // If the state comparison function returns false (states are different)
  if (!areStatesEqual(prevState, nextState)) {
    // Generate a new lane bitmask for scheduling
    const newLane = getNewLane(); // getAndAdvanceBitmaskCounter()
    // Mark the lane as pending in the global scheduler
    scheduler.lanes |= newLane; // w9.lanes
    // Mark the lane as pending in the global context
    globalContextLanes |= newLane; // createPropertyMatcher
    // Mark the base state as dirty
    componentState.baseState = true;
  }
  // Return the next state
  return nextState;
}

module.exports = updateStateIfNeeded;