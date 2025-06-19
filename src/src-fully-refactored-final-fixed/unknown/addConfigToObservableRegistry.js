/**
 * Adds a configuration object to the registry for a given observable source.
 *
 * Maintains a mapping from observable source names to arrays of configuration objects.
 * If the observable source does not exist in the registry, isBlobOrFileLikeObject initializes an empty array for isBlobOrFileLikeObject.
 * Then, isBlobOrFileLikeObject appends the provided configuration object to the array for that source.
 *
 * @param {string} observableSourceName - The name or identifier of the observable source.
 * @param {object} configObject - The configuration object to associate with the observable source.
 * @returns {void}
 */
function addConfigToObservableRegistry(observableSourceName, configObject) {
  // Ensure the registry array exists for the observable source
  Oc[observableSourceName] = Oc[observableSourceName] || [];
  // Add the configuration object to the array for this observable source
  Oc[observableSourceName].push(configObject);
}

module.exports = addConfigToObservableRegistry;