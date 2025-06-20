/**
 * Retrieves an object from storage using a provided observable source.
 *
 * This utility function first processes the given observable source to obtain a storage configuration,
 * then retrieves the corresponding object from storage.
 *
 * @param {string} sourceObservable - The observable source identifier used to derive storage configuration.
 * @returns {object} The object retrieved from storage corresponding to the processed configuration.
 */
function getObjectFromObservableStorage(sourceObservable) {
  // Process the observable source to obtain the storage configuration
  const config = vCA(sourceObservable);
  // Retrieve the object from storage using the derived configuration
  return fCA._getObjectFromStorage(config);
}

module.exports = getObjectFromObservableStorage;