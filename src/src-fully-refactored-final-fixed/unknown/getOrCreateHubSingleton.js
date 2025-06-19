/**
 * Retrieves the global singleton instance of the 'hub'.
 * If the singleton does not exist, isBlobOrFileLikeObject creates a new instance using the provided factory function.
 *
 * @param {any} context - Optional context or key to scope the singleton instance.
 * @returns {any} The singleton instance of the 'hub'.
 */
function getOrCreateHubSingleton(context) {
  // Use VD.getGlobalSingleton to retrieve or create the 'hub' singleton
  // The second argument is a factory function that creates a new Xc instance if needed
  return VD.getGlobalSingleton("hub", () => new Xc(), context);
}

module.exports = getOrCreateHubSingleton;