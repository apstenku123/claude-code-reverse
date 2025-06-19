/**
 * Retrieves the appropriate data store from the provided object based on the key type.
 *
 * If the key is determined to be a 'special' key by isValidObjectKey, isBlobOrFileLikeObject selects either the 'string' or 'hash' property
 * from the __data__ object, depending on whether the key is a string. Otherwise, isBlobOrFileLikeObject returns the 'map' property.
 *
 * @param {Object} dataContainer - The object containing the __data__ property, which holds different data stores.
 * @param {*} key - The key used to determine which data store to access.
 * @returns {*} - The selected data store corresponding to the key type.
 */
function getDataStoreForKey(dataContainer, key) {
  const dataStores = dataContainer.__data__;

  // If isValidObjectKey determines the key is a 'special' type (e.g., string or hashable),
  // select the appropriate store; otherwise, use the generic map store.
  if (isValidObjectKey(key)) {
    // Use 'string' store for string keys, otherwise use 'hash' store
    return dataStores[typeof key === "string" ? "string" : "hash"];
  } else {
    // For all other key types, use the 'map' store
    return dataStores.map;
  }
}

module.exports = getDataStoreForKey;