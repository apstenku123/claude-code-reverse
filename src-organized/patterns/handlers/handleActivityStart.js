/**
 * Handles the start of an activity by checking if an activity is already in progress,
 * and either marks the activity as started or schedules a new activity if necessary.
 *
 * @param {number} activityStartTime - The timestamp representing the start time of the activity.
 * @returns {void}
 */
function handleActivityStart(activityStartTime) {
  // Reset the activity finished flag
  activityFinished = false;

  // Perform any necessary pre-processing for the activity
  processActivityStart(activityStartTime);

  // If an activity is not already in progress
  if (!isActivityInProgress) {
    // Check if there is an unfinished activity
    if (getActivityState(currentActivity) !== null) {
      // Mark the activity as in progress
      isActivityInProgress = true;
      // Notify listeners that the activity has started
      notifyActivityStarted(activityStartListeners);
    } else {
      // Check for a scheduled activity configuration
      const scheduledActivityConfig = getActivityState(activityConfig);
      if (scheduledActivityConfig !== null) {
        // Schedule the activity to start after the required delay
        scheduleActivityStart(
          handleActivityStart,
          scheduledActivityConfig.startTime - activityStartTime
        );
      }
    }
  }
}

module.exports = handleActivityStart;