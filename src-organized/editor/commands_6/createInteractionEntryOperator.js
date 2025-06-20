/**
 * Creates an operator that processes interaction entries with a given configuration.
 *
 * @function createInteractionEntryOperator
 * @description
 * Returns a higher-order operator function that applies a switchMap transformation to the source observable.
 * It uses the provided processInteractionEntries function and configuration object to process each emission.
 * The operator ensures that the configuration is updated with the latest value and is cleaned up on unsubscribe.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries. Should accept (config, entry, index).
 * @param {Object} initialConfig - Initial configuration object used for processing entries.
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function createInteractionEntryOperator(processInteractionEntries, initialConfig) {
  return wy9.operate(function (sourceObservable, observer) {
    // Use a mutable reference to the configuration object
    let currentConfig = initialConfig;
    
    // Create a switchMap operator that processes each emission
    const switchMapped = zy9.switchMap(
      /**
       * @param {any} entry - The emitted value from the source observable
       * @param {number} index - The index of the emission
       * @returns {any} The result of processing the interaction entries
       */
      function (entry, index) {
        return processInteractionEntries(currentConfig, entry, index);
      },
      /**
       * @param {any} entry - The emitted value from the source observable
       * @param {number} newConfig - The new configuration value
       * @returns {any} The updated configuration
       */
      function (entry, newConfig) {
        // Update the current configuration reference
        currentConfig = newConfig;
        return newConfig;
      }
    );

    // Subscribe to the transformed observable
    switchMapped(sourceObservable).subscribe(observer);

    // Cleanup function to reset the configuration reference
    return function () {
      currentConfig = null;
    };
  });
}

module.exports = createInteractionEntryOperator;