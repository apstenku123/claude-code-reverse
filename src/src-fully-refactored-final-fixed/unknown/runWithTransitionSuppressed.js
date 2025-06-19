/**
 * Temporarily suppresses the global transition state and runs a provided function.
 * Restores the previous transition state and global flag after execution.
 *
 * @param {any} context - The context or object to pass to the callback function.
 * @param {any} arg1 - The first argument to pass to the callback function.
 * @param {any} arg2 - The second argument to pass to the callback function.
 * @returns {null} Always returns null after execution.
 */
function runWithTransitionSuppressed(context, arg1, arg2) {
  // Save the current global flag value
  const previousGlobalFlag = handleInputCharacterCode;
  // Save the current transition state
  const previousTransitionState = isValidStringPattern.transition;
  try {
    // Suppress transitions and set global flag to indicate suppression
    isValidStringPattern.transition = null;
    handleInputCharacterCode = 1;
    // Execute the provided function with the given arguments and previous global flag
    gk(context, arg1, arg2, previousGlobalFlag);
  } finally {
    // Restore the original transition state and global flag
    isValidStringPattern.transition = previousTransitionState;
    handleInputCharacterCode = previousGlobalFlag;
  }
  return null;
}

module.exports = runWithTransitionSuppressed;