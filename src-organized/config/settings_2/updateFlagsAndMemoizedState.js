/**
 * Updates the global flags and memoized state for the current context.
 *
 * This function sets specific bits in the global flags (w9.flags) using the provided flagMask,
 * and updates the memoized state of the current context (obtained from createOrAppendStateNode()) by calling addEffectToUpdateQueue
 * with the appropriate parameters.
 *
 * @param {number} flagMask - Bitmask to set on the global flags (w9.flags).
 * @param {number} updateMask - Bitmask to combine with 1 and pass to addEffectToUpdateQueue for state update.
 * @param {any} stateValue - The value to be memoized in the state.
 * @param {any} [optionalValue] - Optional value to be passed to addEffectToUpdateQueue; if undefined, null is used instead.
 * @returns {void}
 */
function updateFlagsAndMemoizedState(flagMask, updateMask, stateValue, optionalValue) {
  // Retrieve the current context or state object
  const currentContext = createOrAppendStateNode();

  // Set the provided flag bits on the global flags object
  w9.flags |= flagMask;

  // Update the memoized state for the current context
  // If optionalValue is undefined, pass null instead
  currentContext.memoizedState = addEffectToUpdateQueue(1 | updateMask, stateValue, undefined, optionalValue === undefined ? null : optionalValue);
}

module.exports = updateFlagsAndMemoizedState;