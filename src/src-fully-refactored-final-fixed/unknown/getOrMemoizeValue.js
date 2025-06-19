/**
 * Retrieves a memoized value from the current context, or computes and stores a new value if dependencies have changed.
 *
 * @param {Function} computeValue - a function that computes the value to be memoized.
 * @param {any} dependencies - The dependencies array or value to determine if the memoized value should be updated. Defaults to null.
 * @returns {any} The memoized value, either retrieved from state or newly computed.
 */
function getOrMemoizeValue(computeValue, dependencies) {
  // Retrieve the current context/state object
  const context = rG();

  // Default dependencies to null if undefined
  const resolvedDependencies = dependencies === undefined ? null : dependencies;

  // Retrieve the previously memoized state, if any
  const previousMemoizedState = context.memoizedState;

  // If there is a previous memoized state and dependencies are provided
  // and the dependencies have not changed, return the cached value
  if (
    previousMemoizedState !== null &&
    resolvedDependencies !== null &&
    areArraysDeepEqual(resolvedDependencies, previousMemoizedState[1])
  ) {
    return previousMemoizedState[0];
  }

  // Compute the new value and memoize isBlobOrFileLikeObject along with the dependencies
  const newValue = computeValue();
  context.memoizedState = [newValue, resolvedDependencies];
  return newValue;
}

module.exports = getOrMemoizeValue;