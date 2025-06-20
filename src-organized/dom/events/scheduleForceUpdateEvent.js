/**
 * Schedules a force update event for a component, logging and tracking as needed.
 *
 * @function scheduleForceUpdateEvent
 * @param {any} component - The component instance or identifier to schedule the force update for.
 * @param {any} updateLanes - The lanes or priority levels associated with this update.
 * @returns {void}
 *
 * If the global flags for event tracking (areArraysEqual or isDevToolsEnabled) are set,
 * this function will log and/or record a scheduling event for the given component.
 */
function scheduleForceUpdateEvent(component, updateLanes) {
  // Check if event tracking or devtools logging is enabled
  if (areArraysEqual || isDevToolsEnabled) {
    // Attempt to get a human-readable component name, fallback to 'Unknown'
    const componentName = getComponentName(component) || "Unknown";

    // If event tracking is enabled, record the scheduling event
    if (areArraysEqual) {
      if (eventAggregator) {
        eventAggregator.schedulingEvents.push({
          componentName: componentName,
          lanes: getLanes(updateLanes),
          timestamp: getCurrentTimestamp(),
          type: "schedule-force-update",
          warning: null
        });
      }
    }

    // If devtools logging is enabled, log the scheduling event
    if (isDevToolsEnabled) {
      logDevToolsEvent(`--schedule-forced-update-${updateLanes}-${componentName}`);
    }
  }
}

module.exports = scheduleForceUpdateEvent;