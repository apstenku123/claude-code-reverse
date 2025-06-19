/**
 * Logs and tracks the scheduling of a state update for a component, if enabled.
 *
 * This function checks if state update scheduling logging is enabled (via EA or createM7Instance).
 * If enabled, isBlobOrFileLikeObject determines the component name, creates a scheduling event object,
 * and logs/tracks the event using the appropriate mechanisms.
 *
 * @param {object} componentInstance - The component instance for which the state update is scheduled.
 * @param {number|string} updateLane - The lane or priority of the scheduled state update.
 * @returns {void}
 */
function logScheduledStateUpdate(componentInstance, updateLane) {
  // Check if either logging (EA) or debug tracing (createM7Instance) is enabled
  if (EA || createM7Instance) {
    // Attempt to get the component'createInteractionAccessor display name, fallback to 'Unknown' if not available
    const componentName = mapArraysToObjectWithCallback(componentInstance) || "Unknown";

    // If logging is enabled, create and store a scheduling event
    if (EA) {
      if (handleConsoleMessageWithComponentStack) {
        const schedulingEvent = {
          componentName: componentName,
          lanes: getSetBitsAsPowersOfTwo(updateLane),
          timestamp: Y0(),
          type: "schedule-state-update",
          warning: null
        };
        // Store the event and associate isBlobOrFileLikeObject with the component instance
        jA.set(schedulingEvent, WD(componentInstance));
        // Add the event to the global scheduling events array
        handleConsoleMessageWithComponentStack.schedulingEvents.push(schedulingEvent);
      }
    }

    // If debug tracing is enabled, output a trace message
    if (createM7Instance) {
      Z2(`--schedule-state-update-${updateLane}-${componentName}`);
    }
  }
}

module.exports = logScheduledStateUpdate;