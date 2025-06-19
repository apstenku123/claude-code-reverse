/**
 * Temporarily suppresses the current transition state and global flag while executing a callback.
 * Restores the original states after execution, regardless of errors.
 *
 * @param {any} context - The context or object to pass to the callback function.
 * @param {any} arg1 - The first argument to pass to the callback function.
 * @param {any} arg2 - The second argument to pass to the callback function.
 * @returns {null} Always returns null after execution.
 */
function executeWithTransitionSuppression(context, arg1, arg2) {
  // Save the current global flag and transition state
  const previousGlobalFlag = handleInputCharacterCode;
  const previousTransition = isValidStringPattern.transition;

  try {
    // Suppress transition and set global flag to indicate suppression
    isValidStringPattern.transition = null;
    handleInputCharacterCode = 1;
    // Execute the callback with the provided arguments and previous global flag
    gk(context, arg1, arg2, previousGlobalFlag);
  } finally {
    // Restore the original transition state and global flag
    isValidStringPattern.transition = previousTransition;
    handleInputCharacterCode = previousGlobalFlag;
  }
  return null;
}

module.exports = executeWithTransitionSuppression;