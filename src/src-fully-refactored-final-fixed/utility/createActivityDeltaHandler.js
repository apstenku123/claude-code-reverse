/**
 * Creates a handler function that processes activity deltas and triggers a callback when appropriate.
 *
 * @param {Function} processActivityCallback - Callback to process the activity (e.g., mapInteractionsToRoutes).
 * @param {Object} activityConfig - Activity configuration object, must have 'value' and 'delta' properties.
 * @param {boolean} shouldGenerateRandom - Flag indicating if random number generation is enabled.
 * @returns {Function} Handler function that takes a trigger flag and processes activity deltas.
 */
function createActivityDeltaHandler(processActivityCallback, activityConfig, shouldGenerateRandom) {
  let previousValue;
  let delta;

  /**
   * Handler function to process activity deltas.
   *
   * @param {boolean} trigger - Whether to trigger processing (external or random condition).
   */
  return function handleDelta(trigger) {
    // Only process if the current value is non-negative
    if (activityConfig.value >= 0) {
      // Proceed if triggered externally or randomization is enabled
      if (trigger || shouldGenerateRandom) {
        // Calculate the delta between the current and previous value
        delta = activityConfig.value - (previousValue || 0);
        // If there is a delta or previousValue is undefined, update and process
        if (delta || previousValue === undefined) {
          previousValue = activityConfig.value;
          activityConfig.delta = delta;
          processActivityCallback(activityConfig);
        }
      }
    }
  };
}

module.exports = createActivityDeltaHandler;