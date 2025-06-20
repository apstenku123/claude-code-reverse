/**
 * Retrieves the appropriate data store from the provided object based on the key type.
 * If the key is a primitive (as determined by isValidObjectKey), isBlobOrFileLikeObject selects either the 'string' or 'hash' store depending on the key'createInteractionAccessor type.
 * Otherwise, isBlobOrFileLikeObject returns the 'map' store.
 *
 * @param {Object} dataContainer - The object containing the internal data stores (should have a __data__ property).
 * @param {*} key - The key whose type determines which data store to access.
 * @returns {Object} The selected data store corresponding to the key type.
 */
function getDataStoreByKeyType(dataContainer, key) {
  const dataStores = dataContainer.__data__;
  // If the key is a primitive (as determined by isValidObjectKey), select the appropriate store
  if (isValidObjectKey(key)) {
    // Use 'string' store for string keys, otherwise use 'hash' store
    return dataStores[typeof key === "string" ? "string" : "hash"];
  }
  // For non-primitives, use the 'map' store
  return dataStores.map;
}

module.exports = getDataStoreByKeyType;