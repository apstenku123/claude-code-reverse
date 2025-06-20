/**
 * Schedules an inspection on the provided resource and optionally sets a timeout to trigger a follow-up action.
 *
 * @param {any} resource - The resource or object to be inspected.
 * @param {any} inspectionParams - Parameters to be used during inspection.
 * @param {any} context - Context or configuration object required for creating the inspector.
 * @param {boolean} shouldScheduleTimeout - Whether to schedule a timeout for a follow-up action.
 * @returns {void}
 */
function scheduleInspectionWithTimeout(resource, inspectionParams, context, shouldScheduleTimeout) {
  // Clear any existing timeout if present
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
  }

  // Initialize the inspector if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  if (inspectorInstance === null) {
    inspectorInstance = new InspectorClass(context);
  }

  // Perform the inspection
  inspectorInstance.inspect(resource, inspectionParams);

  // Optionally schedule a timeout to trigger a follow-up action
  if (shouldScheduleTimeout) {
    pendingTimeoutId = setTimeout(function () {
      return followUpAction(context);
    }, timeoutDuration);
  }
}

module.exports = scheduleInspectionWithTimeout;