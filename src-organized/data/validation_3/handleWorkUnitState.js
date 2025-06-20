/**
 * Handles the state transition and validation for a work unit within the application.
 * If the global processing flag is set, isBlobOrFileLikeObject checks if the current work unit is valid against the current state.
 * If not valid, isBlobOrFileLikeObject attempts to recover or throws an error if the work unit is in an invalid state.
 * Updates flags and global state as necessary.
 *
 * @param {Object} workUnit - The work unit object to process. Must have a 'flags' property.
 * @returns {void}
 */
function handleWorkUnitState(workUnit) {
  // Check if the global processing flag is enabled
  if (isProcessingActive) {
    const currentState = currentWorkUnitState;
    if (currentState) {
      // If the work unit is not valid in the current state
      if (!isWorkUnitValid(workUnit, currentState)) {
        // If the work unit is in an unrecoverable state, throw an error
        if (isWorkUnitInErrorState(workUnit)) {
          throw Error(getErrorMessage(418));
        }
        // Attempt to recover by getting the previous state
        const previousState = getPreviousWorkUnitState(currentState);
        // If recovery is possible, perform recovery action
        if (previousState && isWorkUnitValid(workUnit, previousState)) {
          performRecoveryAction(globalWorkQueue, currentState);
        } else {
          // Otherwise, update flags, disable processing, and set global state
          workUnit.flags = (workUnit.flags & -4097) | 2;
          isProcessingActive = false;
          globalWorkQueue = workUnit;
        }
      }
    } else {
      // If there is no current state, check for error and update state
      if (isWorkUnitInErrorState(workUnit)) {
        throw Error(getErrorMessage(418));
      }
      workUnit.flags = (workUnit.flags & -4097) | 2;
      isProcessingActive = false;
      globalWorkQueue = workUnit;
    }
  }
}

module.exports = handleWorkUnitState;