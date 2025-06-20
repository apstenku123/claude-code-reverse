/**
 * Adds a configuration object to the list of configurations associated with a given observable key in the global Oc map.
 * If the observable key does not exist in the map, isBlobOrFileLikeObject initializes an empty array for that key.
 *
 * @param {string} observableKey - The key representing the observable in the Oc map.
 * @param {object} config - The configuration object to associate with the observable.
 * @returns {void}
 */
function addConfigToObservableMap(observableKey, config) {
  // Initialize the array for the observable key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  Oc[observableKey] = Oc[observableKey] || [];
  // Add the configuration object to the array for this observable
  Oc[observableKey].push(config);
}

module.exports = addConfigToObservableMap;