/**
 * Updates the source observable and retrieves a value from the configuration map.
 *
 * This function first triggers an update or side effect on the provided source observable
 * by calling the external function `mapModuleMetadataToFilenames`. It then retrieves the value associated with the
 * given configuration key from the external map `c3A`.
 *
 * @param {object} sourceObservable - The observable or data source to update or trigger.
 * @param {string} configKey - The key used to retrieve a value from the configuration map.
 * @returns {any} The value associated with the given configKey in the configuration map.
 */
function getConfigValueAfterObservableUpdate(sourceObservable, configKey) {
  // Trigger update or side effect on the source observable
  mapModuleMetadataToFilenames(sourceObservable);
  // Retrieve and return the value from the configuration map using the provided key
  return c3A.get(configKey);
}

module.exports = getConfigValueAfterObservableUpdate;