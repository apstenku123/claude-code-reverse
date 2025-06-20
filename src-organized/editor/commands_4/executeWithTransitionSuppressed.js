/**
 * Temporarily suppresses the current transition and sets a specific context value while executing a callback.
 * Restores the original transition and context value after execution, regardless of success or failure.
 *
 * @param {any} callback - The function to execute while the transition is suppressed.
 * @param {any} arg1 - The first argument to pass to the callback.
 * @param {any} arg2 - The second argument to pass to the callback.
 * @returns {null} Always returns null.
 */
function executeWithTransitionSuppressed(callback, arg1, arg2) {
  // Save the current context value
  const previousContextValue = handleInputCharacterCode;
  // Save the current transition state
  const previousTransition = isValidStringPattern.transition;
  try {
    // Suppress transitions and set context value to a fixed state
    isValidStringPattern.transition = null;
    handleInputCharacterCode = 1;
    // Execute the callback with provided arguments and previous context value
    gk(callback, arg1, arg2, previousContextValue);
  } finally {
    // Restore the original transition and context value
    isValidStringPattern.transition = previousTransition;
    handleInputCharacterCode = previousContextValue;
  }
  return null;
}

module.exports = executeWithTransitionSuppressed;