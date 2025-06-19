/**
 * Retrieves the global singleton array of event processors.
 * If the singleton does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as an empty array.
 *
 * @returns {Array} An array containing global event processor functions.
 */
function getGlobalEventProcessors() {
  // Retrieve or initialize the global singleton for event processors
  return f21.getGlobalSingleton("globalEventProcessors", () => []);
}

module.exports = getGlobalEventProcessors;