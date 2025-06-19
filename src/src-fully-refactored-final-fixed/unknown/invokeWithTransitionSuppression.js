/**
 * Temporarily disables the global transition state and invokes a callback function.
 * This function is useful when you need to perform an operation (such as updating state)
 * without triggering transition-related side effects. After the callback is executed,
 * the original transition state and global value are restored.
 *
 * @param {any} context - The context or object to be passed to the callback.
 * @param {any} arg1 - The first argument to be passed to the callback.
 * @param {any} arg2 - The second argument to be passed to the callback.
 * @returns {null} Always returns null after execution.
 */
function invokeWithTransitionSuppression(context, arg1, arg2) {
  // Save the current global value and transition state
  const previousGlobalValue = handleInputCharacterCode;
  const previousTransitionState = isValidStringPattern.transition;

  try {
    // Suppress transitions and set global value to 1
    isValidStringPattern.transition = null;
    handleInputCharacterCode = 1;
    // Invoke the callback with the provided arguments and previous global value
    gk(context, arg1, arg2, previousGlobalValue);
  } finally {
    // Restore the original transition state and global value
    isValidStringPattern.transition = previousTransitionState;
    handleInputCharacterCode = previousGlobalValue;
  }
  return null;
}

module.exports = invokeWithTransitionSuppression;