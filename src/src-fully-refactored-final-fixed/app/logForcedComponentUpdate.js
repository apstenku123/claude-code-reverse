/**
 * Logs and schedules a forced update event for a React component, if debugging or scheduling is enabled.
 *
 * @param {any} componentInstance - The component instance or identifier to be updated.
 * @param {any} updateLanes - The lanes (priority levels) associated with the update.
 * @returns {void}
 */
function logForcedComponentUpdate(componentInstance, updateLanes) {
  // Check if forced update logging or scheduling is enabled
  if (areArraysEqual || isSchedulingEnabled) {
    // Attempt to get the component'createInteractionAccessor display name, fallback to 'Unknown'
    const componentName = getComponentDisplayName(componentInstance) || "Unknown";

    // If forced update logging is enabled, record the scheduling event
    if (areArraysEqual) {
      if (schedulingEventLogger) {
        schedulingEventLogger.schedulingEvents.push({
          componentName: componentName,
          lanes: getLaneLabels(updateLanes),
          timestamp: getCurrentTimestamp(),
          type: "schedule-force-update",
          warning: null
        });
      }
    }

    // If scheduling is enabled, log a debug message
    if (isSchedulingEnabled) {
      logDebugMessage(`--schedule-forced-update-${updateLanes}-${componentName}`);
    }
  }
}

module.exports = logForcedComponentUpdate;