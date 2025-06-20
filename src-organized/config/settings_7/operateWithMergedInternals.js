/**
 * Applies a custom operation to an observable using merged internals, allowing for stateful configuration and cleanup.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries, mapping each to a route name and storing associated metadata.
 * @param {any} initialConfig - Initial configuration or state to be used and updated during operation.
 * @param {number} [maxSubscriptions=Infinity] - Maximum number of concurrent subscriptions allowed.
 * @returns {any} The result of applying the operation with merged internals.
 */
function operateWithMergedInternals(processInteractionEntries, initialConfig, maxSubscriptions = Infinity) {
  return Dj9.operate(function (sourceObservable, subscriber) {
    // Use a local variable to hold the current configuration/state
    let currentConfig = initialConfig;
    
    return Yj9.mergeInternals(
      sourceObservable, // The source observable
      subscriber,       // The subscriber to forward values to
      // Handler for each emission: process the current config and the emitted values
      function handleEmission(emittedValue, emittedIndex) {
        return processInteractionEntries(currentConfig, emittedValue, emittedIndex);
      },
      maxSubscriptions, // Maximum number of concurrent subscriptions
      // Handler to update the current config/state
      function updateConfig(newConfig) {
        currentConfig = newConfig;
      },
      false,            // normalizeToError not use legacy behavior
      undefined,        // No additional options
      // Cleanup function to reset the config/state when complete
      function cleanupConfig() {
        currentConfig = null;
      }
    );
  });
}

module.exports = operateWithMergedInternals;