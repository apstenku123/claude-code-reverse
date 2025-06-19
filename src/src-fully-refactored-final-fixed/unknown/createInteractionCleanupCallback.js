/**
 * Creates a cleanup callback for removing a specific configuration from a global interaction map.
 * Optionally invokes a provided subscription cleanup function before removal.
 *
 * @param {string} interactionKey - The key used to access the global interaction map (Oc).
 * @param {any} configToRemove - The configuration object or value to remove from the interaction list.
 * @param {Function} [cleanupSubscription] - Optional function to call before removing the config.
 * @returns {Function} a callback function that, when invoked, cleans up the interaction and calls the subscription cleanup if provided.
 */
function createInteractionCleanupCallback(interactionKey, configToRemove, cleanupSubscription) {
  return () => {
    // Invoke the cleanup subscription if provided
    if (cleanupSubscription) {
      cleanupSubscription();
    }

    // Retrieve the interaction list from the global Oc object
    const interactionList = Oc[interactionKey];
    if (!interactionList) {
      return;
    }

    // Find the index of the config to remove
    const configIndex = interactionList.indexOf(configToRemove);
    if (configIndex !== -1) {
      // Remove the config from the interaction list
      interactionList.splice(configIndex, 1);
    }
  };
}

module.exports = createInteractionCleanupCallback;