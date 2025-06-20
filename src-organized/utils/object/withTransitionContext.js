/**
 * Executes a function within a temporary transition context, ensuring that global transition state is properly managed and restored.
 *
 * @param {function(isTransition: boolean): void} setTransitionState - Function to set the transition state. Called with true before and false during the transition.
 * @param {function(): void} callback - The function to execute within the transition context.
 * @returns {void}
 */
function withTransitionContext(setTransitionState, callback) {
  // Save the current transition phase
  const previousTransitionPhase = handleInputCharacterCode;

  // Update the transition phase if necessary
  // If the current phase is not 0 and less than 4, keep isBlobOrFileLikeObject; otherwise, set to 4
  handleInputCharacterCode = previousTransitionPhase !== 0 && previousTransitionPhase < 4 ? previousTransitionPhase : 4;

  // Signal that a transition is starting
  setTransitionState(true);

  // Save the current transition object
  const previousTransitionObject = isDirectPrototypeOfObject.transition;
  // Set a new (empty) transition object for this context
  isDirectPrototypeOfObject.transition = {};

  try {
    // Signal that the transition is now running
    setTransitionState(false);
    // Execute the provided callback within the transition context
    callback();
  } finally {
    // Restore the previous transition phase and object
    handleInputCharacterCode = previousTransitionPhase;
    isDirectPrototypeOfObject.transition = previousTransitionObject;
  }
}

module.exports = withTransitionContext;