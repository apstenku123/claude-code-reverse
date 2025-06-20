/**
 * Updates the memoized state for a component or hook, considering dependency changes.
 * If dependencies have not changed, isBlobOrFileLikeObject reuses the previous destroy function; otherwise, isBlobOrFileLikeObject updates the memoized state.
 *
 * @param {number} flag - The flag to set on the current fiber'createInteractionAccessor flags property.
 * @param {number} updateType - The type of update to perform (bitmask).
 * @param {Function} updateFunction - The function to be memoized (e.g., effect or cleanup function).
 * @param {Array<any>} dependencies - The list of dependencies for memoization; if undefined, defaults to null.
 * @returns {void}
 */
function updateMemoizedStateWithDependencies(flag, updateType, updateFunction, dependencies) {
  // Retrieve the current hook or fiber state
  const currentMemoizedState = rG();

  // Ensure dependencies is null if undefined
  const resolvedDependencies = dependencies === undefined ? null : dependencies;

  // Will hold the previous destroy function, if any
  let previousDestroyFunction;

  // If there is a current fiber/hook context
  if (getAllOwnKeys !== null) {
    // Get the previous memoized state from the current context
    const previousMemoizedState = getAllOwnKeys.memoizedState;
    previousDestroyFunction = previousMemoizedState.destroy;

    // If dependencies are provided and have not changed, reuse the previous destroy function
    if (
      resolvedDependencies !== null &&
      areArraysDeepEqual(resolvedDependencies, previousMemoizedState.deps)
    ) {
      currentMemoizedState.memoizedState = addEffectToUpdateQueue(
        updateType,
        updateFunction,
        previousDestroyFunction,
        resolvedDependencies
      );
      return;
    }
  }

  // If dependencies have changed or there is no previous state, update flags and memoized state
  w9.flags |= flag;
  currentMemoizedState.memoizedState = addEffectToUpdateQueue(
    1 | updateType,
    updateFunction,
    previousDestroyFunction,
    resolvedDependencies
  );
}

module.exports = updateMemoizedStateWithDependencies;