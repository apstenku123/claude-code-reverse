/**
 * Determines if the properties, state, or ref of two component instances have changed,
 * or if a specific bitmask check passes for certain component types.
 *
 * @param {Object} previousInstance - The previous component instance (e.g., Fiber node).
 * @param {Object} nextInstance - The next component instance (e.g., Fiber node).
 * @returns {boolean} True if the component should be considered changed, false otherwise.
 */
function havePropsOrStateChanged(previousInstance, nextInstance) {
  // List of special component tags that require a bitmask check
  switch (nextInstance.tag) {
    case EA: // e.g., HostRoot
    case getSetBitsAsPowersOfTwo: // e.g., HostComponent
    case uA: // e.g., HostText
    case C5: // e.g., Fragment
    case finalizeComponentLayoutEffect: // e.g., Mode
    case K2: // e.g., ContextProvider
      const BITMASK = 1;
      // Use getOrUpdateIterableHelper to get the bitmask flags for the instance
      // Return true if the least significant bit is set
      return (getOrUpdateIterableHelper(nextInstance) & BITMASK) === BITMASK;
    default:
      // For all other types, compare memoizedProps, memoizedState, and ref
      return (
        previousInstance.memoizedProps !== nextInstance.memoizedProps ||
        previousInstance.memoizedState !== nextInstance.memoizedState ||
        previousInstance.ref !== nextInstance.ref
      );
  }
}

module.exports = havePropsOrStateChanged;