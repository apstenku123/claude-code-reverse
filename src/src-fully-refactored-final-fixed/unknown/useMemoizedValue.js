/**
 * Returns a memoized value if the dependencies have not changed; otherwise, updates the memoized value.
 *
 * @param {any} value - The value to memoize.
 * @param {any} dependencies - The dependencies to check for changes. If undefined, defaults to null.
 * @returns {any} The memoized value, either from previous state or the newly provided value.
 */
function useMemoizedValue(value, dependencies) {
  // Retrieve the current context/state object
  const context = rG();
  // Default dependencies to null if not provided
  const resolvedDependencies = dependencies === undefined ? null : dependencies;
  // Get the previously memoized state
  const previousMemoizedState = context.memoizedState;

  // If there is a previous state and dependencies are provided,
  // check if dependencies are equal using areArraysDeepEqual. If so, return the previous value.
  if (
    previousMemoizedState !== null &&
    resolvedDependencies !== null &&
    areArraysDeepEqual(resolvedDependencies, previousMemoizedState[1])
  ) {
    return previousMemoizedState[0];
  }

  // Otherwise, update the memoized state with the new value and dependencies
  context.memoizedState = [value, resolvedDependencies];
  return value;
}

module.exports = useMemoizedValue;