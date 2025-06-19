/**
 * Creates a callback function that, when invoked, optionally calls a cleanup function and removes a configuration from a global observable registry.
 *
 * @param {string} observableKey - The key identifying the observable in the global registry.
 * @param {any} configToRemove - The configuration or listener to remove from the observable'createInteractionAccessor registry.
 * @param {Function} [cleanupCallback] - Optional cleanup function to call before removal.
 * @returns {Function} a function that performs the cleanup and removal when called.
 */
function createUnsubscribeCallback(observableKey, configToRemove, cleanupCallback) {
  return () => {
    // Call the cleanup callback if provided
    if (cleanupCallback) {
      cleanupCallback();
    }

    // Retrieve the list of configurations/listeners for the given observable
    const observableConfigs = Oc[observableKey];
    if (!observableConfigs) {
      return;
    }

    // Find the index of the configuration to remove
    const configIndex = observableConfigs.indexOf(configToRemove);
    if (configIndex !== -1) {
      // Remove the configuration from the observable'createInteractionAccessor registry
      observableConfigs.splice(configIndex, 1);
    }
  };
}

module.exports = createUnsubscribeCallback;