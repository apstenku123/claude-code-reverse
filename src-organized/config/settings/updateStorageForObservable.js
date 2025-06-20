/**
 * Updates the storage entry for a given observable based on the provided configuration object.
 * If the configuration is empty or not provided, the storage entry is removed.
 * Otherwise, the configuration is serialized and stored.
 *
 * @param {string} observableKey - The key or identifier for the observable.
 * @param {Object} configObject - The configuration object to store. If empty or falsy, the storage entry is removed.
 */
function updateStorageForObservable(observableKey, configObject) {
  // Generate the storage key for the observable
  const storageKey = wVA(observableKey);

  // If configObject is not provided or is an empty object, remove the storage entry
  if (!configObject || Object.keys(configObject).length === 0) {
    sq1.Storage.removeItem(storageKey);
    return;
  }

  // Otherwise, serialize and store the configuration object
  sq1.Storage.setItem(storageKey, JSON.stringify(configObject));
}

module.exports = updateStorageForObservable;