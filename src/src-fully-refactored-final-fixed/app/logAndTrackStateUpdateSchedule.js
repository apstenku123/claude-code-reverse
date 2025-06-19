/**
 * Logs and tracks the scheduling of a state update for a React component.
 *
 * This function checks if state update scheduling should be logged or tracked,
 * and if so, records relevant information about the update event. It also optionally
 * triggers a debug log for the scheduling event.
 *
 * @param {object} componentInstance - The React component instance whose state is being updated.
 * @param {number} updateLane - The lane (priority) of the scheduled update.
 * @returns {void}
 */
function logAndTrackStateUpdateSchedule(componentInstance, updateLane) {
  // Check if logging or tracking of state update scheduling is enabled
  if (isSchedulingLogEnabled || isSchedulingDebugEnabled) {
    // Get the component'createInteractionAccessor display name or fallback to 'Unknown'
    const componentName = getComponentDisplayName(componentInstance) || "Unknown";

    // If logging is enabled, record the scheduling event
    if (isSchedulingLogEnabled) {
      if (schedulingLogger) {
        const schedulingEvent = {
          componentName: componentName,
          lanes: getLaneLabel(updateLane),
          timestamp: getCurrentTimestamp(),
          type: "schedule-state-update",
          warning: null
        };
        // Associate the event with the component instance
        schedulingEventMap.set(schedulingEvent, getComponentId(componentInstance));
        // Store the event in the logger'createInteractionAccessor event list
        schedulingLogger.schedulingEvents.push(schedulingEvent);
      }
    }

    // If debug logging is enabled, output a debug message
    if (isSchedulingDebugEnabled) {
      logDebugMessage(`--schedule-state-update-${updateLane}-${componentName}`);
    }
  }
}

module.exports = logAndTrackStateUpdateSchedule;