/**
 * Processes scheduled callbacks up to a given expiration time, executing eligible callbacks and managing scheduling state.
 * 
 * @param {boolean} shouldContinue - Whether to continue processing callbacks after the first eligible one.
 * @param {number} currentTime - The current time (typically a timestamp) used to determine callback eligibility.
 * @returns {boolean} True if there are more callbacks to process, false otherwise.
 */
function processScheduledCallbacks(shouldContinue, currentTime) {
  // Reset global scheduling state
  globalIsScheduling = false;
  if (isRunning && (isRunning = false, clearScheduledTimeout(scheduledTimeoutId), scheduledTimeoutId = -1));
  isProcessingCallbacks = true;

  // Save the current priority level
  const previousPriorityLevel = currentPriorityLevel;
  let hasMoreCallbacks;

  try {
    // Update the current time for scheduling
    updateCurrentTime(currentTime);

    // Get the next scheduled callback
    let scheduledCallbackNode = getNextScheduledCallback(callbackQueue);

    // Process callbacks as long as there are eligible ones
    while (
      scheduledCallbackNode !== null &&
      // Only process if expirationTime is not greater than currentTime, or if shouldContinue is true and not paused
      (!(scheduledCallbackNode.expirationTime > currentTime) || (shouldContinue && !isPaused()))
    ) {
      const callback = scheduledCallbackNode.callback;
      if (typeof callback === "function") {
        // Mark callback as processed
        scheduledCallbackNode.callback = null;
        // Set the current priority level
        currentPriorityLevel = scheduledCallbackNode.priorityLevel;
        // Execute the callback, passing whether isBlobOrFileLikeObject expired
        const continuationCallback = callback(scheduledCallbackNode.expirationTime <= currentTime);
        // Update currentTime after execution
        currentTime = schedulerAPI.unstable_now();
        // If the callback returns another function, set isBlobOrFileLikeObject as the next callback
        if (typeof continuationCallback === "function") {
          scheduledCallbackNode.callback = continuationCallback;
        } else if (scheduledCallbackNode === getNextScheduledCallback(callbackQueue)) {
          // If the callback is done, remove isBlobOrFileLikeObject from the queue
          removeScheduledCallback(callbackQueue);
        }
        // Update the current time for scheduling
        updateCurrentTime(currentTime);
      } else {
        // If callback is not a function, remove isBlobOrFileLikeObject from the queue
        removeScheduledCallback(callbackQueue);
      }
      // Move to the next scheduled callback
      scheduledCallbackNode = getNextScheduledCallback(callbackQueue);
    }

    if (scheduledCallbackNode !== null) {
      hasMoreCallbacks = true;
    } else {
      // If there are no more callbacks, check for delayed callbacks
      const delayedCallbackNode = getNextScheduledCallback(delayedCallbackQueue);
      if (delayedCallbackNode !== null) {
        // Schedule a timeout for the next delayed callback
        scheduleTimeoutForDelayedCallback(
          processDelayedCallbacks,
          delayedCallbackNode.startTime - currentTime
        );
      }
      hasMoreCallbacks = false;
    }
    return hasMoreCallbacks;
  } finally {
    // Cleanup: reset state and restore previous priority
    scheduledCallbackNode = null;
    currentPriorityLevel = previousPriorityLevel;
    isProcessingCallbacks = false;
  }
}

module.exports = processScheduledCallbacks;