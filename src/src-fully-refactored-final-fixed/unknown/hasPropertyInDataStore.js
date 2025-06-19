/**
 * Checks if a given property exists in the internal data store.
 * Uses a direct property check or a fallback method depending on the environment.
 *
 * @param {string} propertyName - The name of the property to check for existence.
 * @returns {boolean} True if the property exists in the data store, false otherwise.
 */
function hasPropertyInDataStore(propertyName) {
  // Access the internal data store object
  const dataStore = this.__data__;

  // If CJ (likely a flag for native support or environment feature) is true,
  // use a direct property existence check, comparing against a special value (processInteractionEntries)
  // Otherwise, use the fallback method createOrAppendStateNode.call to check for the property
  return CJ ? dataStore[propertyName] !== processInteractionEntries : createOrAppendStateNode.call(dataStore, propertyName);
}

module.exports = hasPropertyInDataStore;
