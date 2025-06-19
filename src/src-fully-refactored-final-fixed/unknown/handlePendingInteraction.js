/**
 * Handles the currently pending interaction if one exists.
 *
 * This function checks if there is a pending interaction callback (M71). If so, isBlobOrFileLikeObject records the current time,
 * updates the last interaction timestamp, and attempts to process the interaction. Depending on the result,
 * isBlobOrFileLikeObject either schedules the next interaction or resets the pending state.
 *
 * @returns {void} This function does not return a value.
 */
function handlePendingInteraction() {
  // Check if there is a pending interaction callback
  if (M71 !== null) {
    // Get the current timestamp using the scheduler'createInteractionAccessor clock
    const currentTimestamp = Y_4.unstable_now();
    // Update the global last interaction timestamp
    c30 = currentTimestamp;
    let shouldContinue = true;
    try {
      // Attempt to process the pending interaction
      shouldContinue = M71(true, currentTimestamp);
    } finally {
      // If the interaction should continue, schedule the next step
      // Otherwise, reset the pending state
      if (shouldContinue) {
        sn();
      } else {
        T71 = false;
        M71 = null;
      }
    }
  } else {
    // No pending interaction; reset the pending state
    T71 = false;
  }
}

module.exports = handlePendingInteraction;