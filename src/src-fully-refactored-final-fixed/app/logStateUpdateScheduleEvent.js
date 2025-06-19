/**
 * Logs and tracks the scheduling of a state update event for a given component.
 *
 * This function checks global flags to determine if scheduling events should be logged or tracked.
 * If enabled, isBlobOrFileLikeObject creates an event object with relevant details and pushes isBlobOrFileLikeObject to the scheduling events array.
 * It also logs a message to the console if the appropriate flag is set.
 *
 * @param {Object} componentInstance - The component instance for which the state update is being scheduled.
 * @param {number|string} updateLane - The identifier for the update lane being scheduled.
 * @returns {void}
 */
function logStateUpdateScheduleEvent(componentInstance, updateLane) {
  // Check if either event tracking or logging is enabled
  if (areArraysEqual || isLoggingEnabled) {
    // Get the component'createInteractionAccessor display name or default to 'Unknown'
    const componentName = getComponentName(componentInstance) || "Unknown";

    // If event tracking is enabled, log the scheduling event
    if (areArraysEqual) {
      if (eventTracker) {
        const scheduleEvent = {
          componentName: componentName,
          lanes: getLaneIdentifiers(updateLane),
          timestamp: getCurrentTimestamp(),
          type: "schedule-state-update",
          warning: null
        };
        // Associate the event with the component instance
        eventMap.set(scheduleEvent, getComponentId(componentInstance));
        // Push the event to the global scheduling events array
        eventTracker.schedulingEvents.push(scheduleEvent);
      }
    }

    // If logging is enabled, output a message to the console
    if (isLoggingEnabled) {
      logToConsole(`--schedule-state-update-${updateLane}-${componentName}`);
    }
  }
}

module.exports = logStateUpdateScheduleEvent;