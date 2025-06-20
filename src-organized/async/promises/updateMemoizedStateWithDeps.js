/**
 * Updates the memoized state for the current context, handling dependency changes and cleanup logic.
 *
 * @param {number} flag - The flag to set on the current fiber'createInteractionAccessor flags property.
 * @param {number} effectType - The type of effect to apply (bitmask).
 * @param {Function} effectCallback - The effect callback function to be memoized.
 * @param {Array<any>} dependencies - The dependency array for the effect; used to determine if the effect should re-run.
 * @returns {void}
 */
function updateMemoizedStateWithDeps(flag, effectType, effectCallback, dependencies) {
  // Get the current hook context (e.g., current fiber or hook state)
  const currentHookContext = rG();

  // Default dependencies to null if not provided
  const resolvedDependencies = dependencies === undefined ? null : dependencies;

  // Initialize previousDestroyCallback to undefined
  let previousDestroyCallback = undefined;

  // If there is a previous hook context (e.g., during update phase)
  if (getAllOwnKeys !== null) {
    const previousMemoizedState = getAllOwnKeys.memoizedState;
    previousDestroyCallback = previousMemoizedState.destroy;

    // If dependencies are provided and have not changed, reuse the previous effect
    if (
      resolvedDependencies !== null &&
      areArraysDeepEqual(resolvedDependencies, previousMemoizedState.deps)
    ) {
      currentHookContext.memoizedState = addEffectToUpdateQueue(
        effectType,
        effectCallback,
        previousDestroyCallback,
        resolvedDependencies
      );
      return;
    }
  }

  // Mark the current fiber with the provided flag
  w9.flags |= flag;

  // Set the new memoized state with the updated effect and dependencies
  currentHookContext.memoizedState = addEffectToUpdateQueue(
    1 | effectType,
    effectCallback,
    previousDestroyCallback,
    resolvedDependencies
  );
}

module.exports = updateMemoizedStateWithDeps;