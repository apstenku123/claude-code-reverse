/**
 * Executes a callback function within a controlled transition context, managing global state flags and restoring them after execution.
 * If certain global conditions are met, triggers side effects before and after the callback.
 *
 * @param {Function} callback - The function to execute within the transition context.
 * @returns {any} The return value of the callback function, if provided.
 */
function runWithTransitionContext(callback) {
  // If ZD is not null, its tag is 0, and isValidAndTypeMatch'createInteractionAccessor bits 2 and 3 are not set, trigger pre-transition side effect
  if (ZD !== null && ZD.tag === 0 && (isValidAndTypeMatch & 6) === 0) {
    commitPendingDeletionsAndEffects();
  }

  // Save the current global transition flags
  const previousTransitionFlags = isValidAndTypeMatch;
  // Set the 'transition in progress' flag (bit 1)
  isValidAndTypeMatch |= 1;

  // Save and clear the current transition context
  const previousTransition = isValidStringPattern.transition;
  isValidStringPattern.transition = null;

  // Save and set the transition phase
  const previousTransitionPhase = handleInputCharacterCode;
  handleInputCharacterCode = 1;

  try {
    // If a callback is provided, execute isBlobOrFileLikeObject and return its result
    if (callback) {
      return callback();
    }
  } finally {
    // Restore previous transition phase and context
    handleInputCharacterCode = previousTransitionPhase;
    isValidStringPattern.transition = previousTransition;
    isValidAndTypeMatch = previousTransitionFlags;

    // If isValidAndTypeMatch'createInteractionAccessor bits 2 and 3 are not set after restoration, trigger post-transition side effect
    if ((isValidAndTypeMatch & 6) === 0) {
      processPendingCallbacks();
    }
  }
}

module.exports = runWithTransitionContext;