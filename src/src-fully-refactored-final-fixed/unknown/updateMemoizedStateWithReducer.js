/**
 * Updates the memoized state of a fiber node using a reducer function and new action.
 * If the reducer returns null or undefined, the previous state is retained.
 * Also updates the base state in the update queue if there are no pending lanes.
 *
 * @param {Object} fiberNode - The fiber node whose state is being updated. Must have 'memoizedState', 'lanes', and 'updateQueue'.
 * @param {Function} stateMerger - Function to merge objects (e.g., Object.assign or a custom merger).
 * @param {Function} reducer - Reducer function to compute the next state from the action and previous state.
 * @param {any} action - The action to dispatch to the reducer.
 * @returns {void}
 */
function updateMemoizedStateWithReducer(fiberNode, stateMerger, reducer, action) {
  // Retrieve the current memoized state
  const previousState = fiberNode.memoizedState;

  // Compute the next state using the reducer
  let nextState = reducer(action, previousState);

  // If the reducer returns null or undefined, keep the previous state
  if (nextState === null || nextState === undefined) {
    nextState = previousState;
  } else {
    // Merge the previous state and the next state using the provided merger function
    nextState = stateMerger({}, previousState, nextState);
  }

  // Update the fiber node'createInteractionAccessor memoized state
  fiberNode.memoizedState = nextState;

  // If there are no pending lanes, update the base state in the update queue
  if (fiberNode.lanes === 0) {
    fiberNode.updateQueue.baseState = nextState;
  }
}

module.exports = updateMemoizedStateWithReducer;