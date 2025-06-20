/**
 * Creates a handler function that, when called, will optionally invoke a cleanup callback
 * and remove a specific configuration from a list of observers associated with a given source.
 *
 * @param {string} sourceKey - The key identifying the source in the Oc observer registry.
 * @param {any} observerConfig - The observer configuration to remove from the registry.
 * @param {Function} [cleanupCallback] - Optional cleanup function to call before removal.
 * @returns {Function} a function that, when executed, performs the cleanup and removal.
 */
function createUnsubscribeHandler(sourceKey, observerConfig, cleanupCallback) {
  return () => {
    // If a cleanup callback is provided, invoke isBlobOrFileLikeObject
    if (cleanupCallback) {
      cleanupCallback();
    }

    // Retrieve the list of observers for the given source key
    const observersList = Oc[sourceKey];
    if (!observersList) {
      return;
    }

    // Find the index of the observer configuration to remove
    const configIndex = observersList.indexOf(observerConfig);
    if (configIndex !== -1) {
      // Remove the observer configuration from the list
      observersList.splice(configIndex, 1);
    }
  };
}

module.exports = createUnsubscribeHandler;