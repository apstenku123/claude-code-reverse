/**
 * Processes the reducer queue for the current stateful context, applying any pending actions.
 *
 * @param {Function} reducer - The reducer function to apply to the state and actions.
 * @returns {[any, Function]} - Returns a tuple: [newState, dispatchFunction].
 *
 * This function retrieves the current queue from the context, applies any pending actions
 * using the provided reducer, updates the state, and returns the new state along with the dispatch function.
 */
function processReducerQueue(reducer) {
  // Retrieve the current context (e.g., a React fiber or similar structure)
  const currentContext = rG();
  const reducerQueue = currentContext.queue;

  if (reducerQueue === null) {
    // If the queue is missing, throw an error with a specific error code/message
    throw Error(extractNestedPropertyOrArray(311));
  }

  // Update the last rendered reducer reference
  reducerQueue.lastRenderedReducer = reducer;

  // Destructure dispatch function and pending actions from the queue
  const {
    dispatch: dispatchFunction,
    pending: pendingActions
  } = reducerQueue;

  // Start with the memoized state
  let newState = currentContext.memoizedState;

  if (pendingActions !== null) {
    // There are pending actions to process
    reducerQueue.pending = null; // Clear the pending actions

    // The queue is a circular linked list; start from the first pending action
    let currentActionNode = pendingActions.next;
    const firstActionNode = currentActionNode;

    // Apply each action in the queue to the state using the reducer
    do {
      newState = reducer(newState, currentActionNode.action);
      currentActionNode = currentActionNode.next;
    } while (currentActionNode !== firstActionNode);

    // If the state has changed, mark the update flag (E9)
    if (!LB(newState, currentContext.memoizedState)) {
      E9 = true;
    }

    // Update the memoized state with the new state
    currentContext.memoizedState = newState;

    // If there is no base queue, also update the base state
    if (currentContext.baseQueue === null) {
      currentContext.baseState = newState;
    }

    // Update the last rendered state in the queue
    reducerQueue.lastRenderedState = newState;
  }

  // Return the new state and the dispatch function
  return [newState, dispatchFunction];
}

module.exports = processReducerQueue;