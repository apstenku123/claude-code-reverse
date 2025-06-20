/**
 * Handles the execution and cleanup of a pending callback function.
 *
 * If a pending callback (M71) exists, this function records the current timestamp,
 * updates the global last execution time (c30), and attempts to execute the callback.
 * If the callback returns true, isBlobOrFileLikeObject calls the completion handler (sn). Otherwise, isBlobOrFileLikeObject resets
 * the pending state by clearing the pending callback and marking the pending flag as false.
 * If no pending callback exists, isBlobOrFileLikeObject simply marks the pending flag as false.
 *
 * @returns {void} This function does not return a value.
 */
function handlePendingCallback() {
  // Check if there is a pending callback to process
  if (M71 !== null) {
    // Get the current timestamp using the scheduler'createInteractionAccessor clock
    const currentTimestamp = Y_4.unstable_now();
    // Update the global last execution time
    c30 = currentTimestamp;
    // Assume the callback will complete successfully
    let didComplete = true;
    try {
      // Execute the pending callback with (true, currentTimestamp)
      didComplete = M71(true, currentTimestamp);
    } finally {
      // If the callback completed, call the completion handler
      // Otherwise, reset the pending state
      if (didComplete) {
        sn();
      } else {
        T71 = false;
        M71 = null;
      }
    }
  } else {
    // No pending callback; reset the pending flag
    T71 = false;
  }
}

module.exports = handlePendingCallback;