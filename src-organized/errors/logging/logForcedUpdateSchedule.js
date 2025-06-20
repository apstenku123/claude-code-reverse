/**
 * Logs and tracks forced update scheduling events for a component.
 *
 * This function checks if forced update scheduling is enabled (via global flags),
 * and if so, logs the scheduling event and/or pushes event details to a global event tracker.
 *
 * @param {any} componentInstance - The component instance or identifier to be updated.
 * @param {any} updateLanes - The lanes (priority levels) for the forced update.
 * @returns {void}
 */
function logForcedUpdateSchedule(componentInstance, updateLanes) {
  // Check if forced update scheduling is enabled via global flags
  if (EA || createM7Instance) {
    // Get the component'createInteractionAccessor display name, or default to 'Unknown'
    const componentName = mapArraysToObjectWithCallback(componentInstance) || "Unknown";

    // If event tracking is enabled, push the scheduling event details
    if (EA) {
      if (handleConsoleMessageWithComponentStack) {
        handleConsoleMessageWithComponentStack.schedulingEvents.push({
          componentName: componentName,
          lanes: getSetBitsAsPowersOfTwo(updateLanes),
          timestamp: Y0(),
          type: "schedule-force-update",
          warning: null
        });
      }
    }

    // If logging is enabled, log the forced update scheduling event
    if (createM7Instance) {
      Z2(`--schedule-forced-update-${updateLanes}-${componentName}`);
    }
  }
}

module.exports = logForcedUpdateSchedule;