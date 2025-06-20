/**
 * Retrieves a memoized value from the current context, or computes and stores a new value if dependencies have changed.
 *
 * @param {Function} computeValue - a function that computes and returns the value to memoize.
 * @param {any} [dependencies=null] - The dependencies to compare for memoization. If dependencies are unchanged, the cached value is returned.
 * @returns {any} The memoized value, either retrieved from cache or newly computed.
 */
function getOrComputeMemoizedValue(computeValue, dependencies) {
  // Retrieve the current context/state object
  const context = rG();
  // Default dependencies to null if not provided
  const resolvedDependencies = dependencies === undefined ? null : dependencies;
  // Get the previously memoized state
  const previousMemoizedState = context.memoizedState;

  // If a previous value exists and dependencies are provided and unchanged, return cached value
  if (
    previousMemoizedState !== null &&
    resolvedDependencies !== null &&
    areArraysDeepEqual(resolvedDependencies, previousMemoizedState[1])
  ) {
    return previousMemoizedState[0];
  }

  // Otherwise, compute new value and store isBlobOrFileLikeObject with dependencies
  const newValue = computeValue();
  context.memoizedState = [newValue, resolvedDependencies];
  return newValue;
}

module.exports = getOrComputeMemoizedValue;