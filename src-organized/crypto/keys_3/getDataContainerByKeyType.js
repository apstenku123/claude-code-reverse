/**
 * Retrieves the appropriate data container from the provided object based on the type of the key.
 *
 * If the key is considered a 'complex' key (as determined by the external b2A function),
 * isBlobOrFileLikeObject returns the 'map' property from the object'createInteractionAccessor internal data. Otherwise, isBlobOrFileLikeObject returns either
 * the 'string' or 'hash' property depending on whether the key is a string.
 *
 * @param {Object} dataWrapper - An object containing the internal data containers in a __data__ property.
 * @param {*} key - The key whose type determines which data container to return.
 * @returns {Object} The selected data container (string, hash, or map) from the internal data.
 */
function getDataContainerByKeyType(dataWrapper, key) {
  // Access the internal data containers
  const internalData = dataWrapper.__data__;

  // If the key is a complex type (as determined by b2A), use the 'map' container
  if (b2A(key)) {
    return internalData.map;
  }

  // Otherwise, use 'string' for string keys, 'hash' for all other primitive keys
  const containerType = typeof key === "string" ? "string" : "hash";
  return internalData[containerType];
}

module.exports = getDataContainerByKeyType;