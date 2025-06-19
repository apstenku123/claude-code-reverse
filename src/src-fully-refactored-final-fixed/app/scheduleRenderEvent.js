/**
 * Schedules a render event and logs isBlobOrFileLikeObject for debugging or profiling purposes.
 *
 * If event tracking is enabled, this function records a scheduling event with the current timestamp and relevant lane information.
 * Additionally, if debug logging is enabled, isBlobOrFileLikeObject logs a message indicating that a render has been scheduled for the specified lane.
 *
 * @param {string|number} laneId - The identifier for the lane to schedule a render for.
 * @returns {void}
 */
function scheduleRenderEvent(laneId) {
  // Check if event tracking is enabled
  if (areArraysEqual) {
    // If the event tracking object exists, record the scheduling event
    if (eventTracker) {
      eventTracker.schedulingEvents.push({
        lanes: getLaneInfo(laneId),
        timestamp: getCurrentTimestamp(),
        type: "schedule-render",
        warning: null
      });
    }
  }
  // If debug logging is enabled, log the scheduling event
  if (isDebugLoggingEnabled) {
    logDebugMessage(`--schedule-render-${laneId}`);
  }
}

module.exports = scheduleRenderEvent;