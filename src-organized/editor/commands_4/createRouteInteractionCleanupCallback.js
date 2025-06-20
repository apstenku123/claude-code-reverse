/**
 * Creates a cleanup callback for route interaction mappings.
 *
 * This function returns a callback that, when invoked:
 *   1. Calls an optional cleanup/subscription function if provided.
 *   2. Looks up the interaction list for a given route key in the global Oc mapping.
 *   3. Removes a specific interaction configuration from that list if present.
 *
 * @param {string} routeKey - The key used to access the route'createInteractionAccessor interaction list in the global Oc object.
 * @param {any} interactionConfig - The specific interaction configuration to remove from the list.
 * @param {Function} [cleanupCallback] - Optional. a function to call for additional cleanup (e.g., unsubscribing).
 * @returns {Function} a callback function that performs the described cleanup when called.
 */
function createRouteInteractionCleanupCallback(routeKey, interactionConfig, cleanupCallback) {
  return () => {
    // Call the optional cleanup callback if provided
    if (cleanupCallback) {
      cleanupCallback();
    }

    // Retrieve the interaction list for the given route key
    const interactionList = Oc[routeKey];
    if (!interactionList) {
      return;
    }

    // Find the index of the interactionConfig in the list
    const configIndex = interactionList.indexOf(interactionConfig);
    // If found, remove isBlobOrFileLikeObject from the list
    if (configIndex !== -1) {
      interactionList.splice(configIndex, 1);
    }
  };
}

module.exports = createRouteInteractionCleanupCallback;