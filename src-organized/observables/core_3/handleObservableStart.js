/**
 * Handles the start of an observable sequence, ensuring proper state and scheduling.
 *
 * This function resets the running flag, processes the observable, and manages the global state.
 * If a specific observable (identified by 'yz') is active, isBlobOrFileLikeObject sets the global state and triggers a handler.
 * Otherwise, if a fallback observable (identified by 'wL') exists, isBlobOrFileLikeObject schedules a retry based on its start time.
 *
 * @param {number} observableStartTime - The start time (timestamp) of the observable sequence.
 * @returns {void}
 */
function handleObservableStart(observableStartTime) {
  // Reset the running flag
  runningFlag = false;

  // Process the observable start
  processObservableStart(observableStartTime);

  // If the global state is not set
  if (!globalStateActive) {
    // Check if the primary observable is available
    if (getObservableById(primaryObservableId) !== null) {
      // Set the global state and trigger the handler
      globalStateActive = true;
      triggerGlobalStateHandler(globalStateCallback);
    } else {
      // Fallback: check for a secondary observable
      const fallbackConfig = getObservableById(fallbackObservableId);
      if (fallbackConfig !== null) {
        // Schedule a retry based on the fallback'createInteractionAccessor start time
        scheduleRetry(handleObservableStart, fallbackConfig.startTime - observableStartTime);
      }
    }
  }
}

module.exports = handleObservableStart;