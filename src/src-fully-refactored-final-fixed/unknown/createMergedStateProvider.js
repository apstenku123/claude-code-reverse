/**
 * Creates a function that merges state from three sources: initial state, config state, and observable state.
 *
 * @param {Function} getObservableState - Function that returns an object representing the observable state (formerly deepCloneWithCycleDetection).
 * @param {Function} [getConfigState] - Optional function that returns an object representing the config state (formerly createPropertyAccessor).
 * @param {Function} [getInitialState] - Optional function that returns an object representing the initial state (formerly a).
 * @returns {Function} a function that, when called, returns the merged state object.
 */
function createMergedStateProvider(getInitialState, getConfigState, getObservableState) {
  // Clone the observable state at initialization
  const observableState = {
    ...getObservableState()
  };

  // This object will accumulate config and initial state properties
  const mergedState = {};

  // Return a function that merges config, initial, and observable state
  return () => {
    // Merge config state if provided
    if (typeof getConfigState === 'function' && getConfigState() != null) {
      Object.assign(mergedState, getConfigState());
    }
    // Merge initial state if provided
    if (typeof getInitialState === 'function' && getInitialState() != null) {
      Object.assign(mergedState, getInitialState());
    }
    // Merge observable state (captured at creation)
    return Object.assign(mergedState, observableState);
  };
}

module.exports = createMergedStateProvider;