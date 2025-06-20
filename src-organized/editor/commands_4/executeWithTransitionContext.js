/**
 * Executes a provided callback function within a managed transition context.
 * Handles transition state, global flags, and ensures proper cleanup after execution.
 *
 * @param {Function} callback - The function to execute within the transition context.
 * @returns {any} The return value of the callback, if provided.
 */
function executeWithTransitionContext(callback) {
  // If there is a current transition (ZD) with tag 0 and no error/suspense flags, flush pending transitions
  if (ZD !== null && ZD.tag === 0 && (isValidAndTypeMatch & 6) === 0) {
    commitPendingDeletionsAndEffects();
  }

  // Save the current transition flags
  const previousTransitionFlags = isValidAndTypeMatch;
  // Mark that a transition is in progress
  isValidAndTypeMatch |= 1;

  // Save the current transition state and queue
  const previousTransition = isValidStringPattern.transition;
  const previousQueue = handleInputCharacterCode;

  try {
    // Clear the current transition and set the queue to 1 (active)
    isValidStringPattern.transition = null;
    handleInputCharacterCode = 1;
    // If a callback is provided, execute isBlobOrFileLikeObject and return its result
    if (callback) {
      return callback();
    }
  } finally {
    // Restore previous queue, transition, and flags
    handleInputCharacterCode = previousQueue;
    isValidStringPattern.transition = previousTransition;
    isValidAndTypeMatch = previousTransitionFlags;
    // If there are no error/suspense flags, flush any remaining transitions
    if ((isValidAndTypeMatch & 6) === 0) {
      processPendingCallbacks();
    }
  }
}

module.exports = executeWithTransitionContext;