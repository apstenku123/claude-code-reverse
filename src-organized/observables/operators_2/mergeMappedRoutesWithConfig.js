/**
 * Merges mapped user interaction routes with a configuration object, managing internal state and cleanup.
 *
 * @function mergeMappedRoutesWithConfig
 * @param {Function} mapInteractionsToRoutes - Function to map user interactions to route names and metadata.
 * @param {any} initialConfig - Initial configuration object to be used and updated during merging.
 * @param {number} [maxConcurrency=Infinity] - Maximum number of concurrent subscriptions allowed.
 * @returns {any} The result of the Dj9.operate call, which merges mapped routes with configuration using internal logic.
 */
function mergeMappedRoutesWithConfig(mapInteractionsToRoutes, initialConfig, maxConcurrency = Infinity) {
  return Dj9.operate((sourceObservable, subscriber) => {
    // Maintain a reference to the current configuration
    let currentConfig = initialConfig;

    return Yj9.mergeInternals(
      sourceObservable,
      subscriber,
      // Project function: maps each emission using the provided mapping function
      (interactionEntry, routeMetadata) => {
        return mapInteractionsToRoutes(currentConfig, interactionEntry, routeMetadata);
      },
      maxConcurrency,
      // Update function: updates the current configuration
      (updatedConfig) => {
        currentConfig = updatedConfig;
      },
      false, // Use default value for the sixth parameter
      undefined, // Use default value for the seventh parameter
      // Cleanup function: resets the configuration reference
      () => {
        currentConfig = null;
      }
    );
  });
}

module.exports = mergeMappedRoutesWithConfig;