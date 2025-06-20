/**
 * Retrieves a value associated with the specified key from the object'createInteractionAccessor internal data storage.
 *
 * @param {string} key - The key whose associated value is to be returned.
 * @returns {any} The value associated with the specified key, or undefined if the key does not exist.
 */
function getValueFromInternalData(key) {
  // Access the internal __data__ Map and retrieve the value for the given key
  return this.__data__.get(key);
}

module.exports = getValueFromInternalData;