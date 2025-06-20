/**
 * Schedules a forced update for a component, optionally logging and tracking the event.
 *
 * @param {any} componentIdentifier - The identifier or reference for the component to update.
 * @param {any} updateLanes - The lanes or priority levels associated with the forced update.
 * @returns {void}
 *
 * If the global flags for event tracking (EA) or logging (createM7Instance) are enabled, this function will:
 *   - Push a scheduling event to the handleConsoleMessageWithComponentStack.schedulingEvents array (if EA is enabled and handleConsoleMessageWithComponentStack exists).
 *   - Log the scheduling event using Z2 (if createM7Instance is enabled).
 */
function scheduleForcedComponentUpdate(componentIdentifier, updateLanes) {
  // Check if event tracking or logging is enabled
  if (EA || createM7Instance) {
    // Get the component'createInteractionAccessor display name or use 'Unknown' if not available
    const componentName = mapArraysToObjectWithCallback(componentIdentifier) || "Unknown";

    // If event tracking is enabled, record the scheduling event
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

    // If logging is enabled, log the forced update event
    if (createM7Instance) {
      Z2(`--schedule-forced-update-${updateLanes}-${componentName}`);
    }
  }
}

module.exports = scheduleForcedComponentUpdate;