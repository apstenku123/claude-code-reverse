/**
 * Initializes the reducer state and queue for a React-like hook system.
 *
 * This function sets up the initial state for a reducer, handling both direct values and initializer functions.
 * It creates a queue object to manage pending updates and binds the dispatch function.
 *
 * @param {any|function} initialStateOrInitializer - The initial state value or a function that returns the initial state.
 * @returns {[any, function]} An array containing the current state and the dispatch function.
 */
function initializeReducerState(initialStateOrInitializer) {
  // Get the current hook context (similar to React'createInteractionAccessor internal hook state)
  const hookContext = createOrAppendStateNode();

  // If the initial state is a function, call isBlobOrFileLikeObject to get the value (lazy initialization)
  let initialState = typeof initialStateOrInitializer === "function"
    ? initialStateOrInitializer()
    : initialStateOrInitializer;

  // Set both memoizedState and baseState to the initial state
  hookContext.memoizedState = hookContext.baseState = initialState;

  // Create the queue object to manage state updates
  const updateQueue = {
    pending: null,             // Pending updates
    interleaved: null,         // Interleaved updates (for concurrent rendering)
    lanes: 0,                  // Lanes for scheduling
    dispatch: null,            // Will be set to the dispatch function
    lastRenderedReducer: iI,   // Reference to the reducer function
    lastRenderedState: initialState // Last rendered state value
  };

  // Attach the queue to the hook context
  hookContext.queue = updateQueue;

  // Bind the dispatch function to the queue
  // isClassHandleValid is the reducer dispatch handler, w9 is the reducer logic
  const dispatch = updateQueue.dispatch = isClassHandleValid.bind(null, w9, updateQueue);

  // Return the current state and the dispatch function
  return [hookContext.memoizedState, dispatch];
}

module.exports = initializeReducerState;