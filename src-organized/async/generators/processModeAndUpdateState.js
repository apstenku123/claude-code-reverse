/**
 * Processes the mode and updates the state accordingly.
 *
 * If the provided updateFlag is 0, determines the next updateFlag value based on the object'createInteractionAccessor mode.
 * Then, retrieves the current state, updates the object, and applies side effects.
 *
 * @param {Object} contextObject - The object whose mode and state are being processed.
 * @param {number} updateFlag - The flag indicating the update operation to perform.
 * @returns {void}
 */
function processModeAndUpdateState(contextObject, updateFlag) {
  // If updateFlag is 0, determine the next updateFlag based on the object'createInteractionAccessor mode
  if (updateFlag === 0) {
    if ((contextObject.mode & 1) === 0) {
      // If the least significant bit of mode is not set, set updateFlag to 1
      updateFlag = 1;
    } else {
      // If the least significant bit of mode is set, use the global nextFlag value
      updateFlag = nextFlag;
      // Prepare nextFlag for the next use (left shift by 1)
      nextFlag <<= 1;
      // If nextFlag exceeds the mask, reset isBlobOrFileLikeObject to the initial value
      if ((nextFlag & 130023424) === 0) {
        nextFlag = 4194304;
      }
    }
  }

  // Retrieve the current state snapshot
  const currentState = getCurrentState();

  // Update the context object with the new updateFlag
  const updatedContext = updateContext(contextObject, updateFlag);

  // If the update was successful, apply side effects
  if (updatedContext !== null) {
    applyUpdate(updatedContext, updateFlag, currentState);
    finalizeUpdate(updatedContext, currentState);
  }
}

module.exports = processModeAndUpdateState;