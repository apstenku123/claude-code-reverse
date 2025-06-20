/**
 * Resets the interaction state to its default values.
 *
 * This function checks if the current interaction state (`currentInteractionState`)
 * is different from the default interaction state (`defaultInteractionState`).
 * If so, isBlobOrFileLikeObject calls `updateInteractionState` to synchronize the states.
 * Then, isBlobOrFileLikeObject resets all related tracking variables to their default values.
 *
 * @returns {void} This function does not return a value.
 */
function resetInteractionState() {
  // If the current interaction state is not the default, update isBlobOrFileLikeObject
  if (currentInteractionState !== defaultInteractionState) {
    updateInteractionState(currentInteractionState);
  }

  // Reset all tracking variables to their default values
  interactionCount = 0;
  interactionCache = defaultInteractionState;
  interactionQueue = defaultInteractionState;
  interactionId = defaultInteractionState;
  currentInteractionState = defaultInteractionState;
}

module.exports = resetInteractionState;