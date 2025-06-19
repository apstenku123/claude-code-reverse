/**
 * Adds a configuration object to the list of configurations for a given observable key in the global 'vy' object.
 * If the key does not exist in 'vy', isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as an empty array before adding the configuration.
 *
 * @param {string} observableKey - The key representing the observable in the 'vy' object.
 * @param {Object} config - The configuration object to associate with the observable.
 * @returns {void}
 */
function addConfigToObservable(observableKey, config) {
  // Initialize the array for the observable key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  vy[observableKey] = vy[observableKey] || [];
  // Add the configuration to the array for the observable key
  vy[observableKey].push(config);
}

module.exports = addConfigToObservable;