/**
 * Creates a handler function that processes interaction deltas when certain conditions are met.
 *
 * @param {Function} processInteractionEntries - Callback to process interaction entries (e.g., logging, analytics).
 * @param {Object} interactionConfig - Configuration object containing the current interaction value and delta.
 *   @property {number} value - The current interaction value (e.g., timestamp or counter).
 *   @property {number} [delta] - The computed delta between the current and previous value.
 * @param {boolean} isSubscribed - Indicates if the handler should always process on trigger, regardless of input.
 * @returns {Function} Handler function that takes a trigger flag and processes the interaction delta if conditions are met.
 */
function createInteractionDeltaHandler(processInteractionEntries, interactionConfig, isSubscribed) {
  let previousValue;
  let currentDelta;

  /**
   * Handler to be called when an interaction event occurs.
   *
   * @param {boolean} trigger - Whether to force processing regardless of subscription status.
   */
  return function handleInteraction(trigger) {
    // Only process if the current value is non-negative
    if (interactionConfig.value >= 0) {
      // Process if explicitly triggered or always if subscribed
      if (trigger || isSubscribed) {
        // Calculate the delta between the current and previous value
        currentDelta = interactionConfig.value - (previousValue || 0);
        // Only process if there is a delta or if this is the first run (previousValue is undefined)
        if (currentDelta || previousValue === undefined) {
          previousValue = interactionConfig.value;
          interactionConfig.delta = currentDelta;
          // Invoke the callback with the updated config
          processInteractionEntries(interactionConfig);
        }
      }
    }
  };
}

module.exports = createInteractionDeltaHandler;