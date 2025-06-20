/**
 * Retrieves the value associated with the given key from the internal data store.
 * Handles both object and non-object data stores, and returns undefined for missing or unset values.
 *
 * @param {string} key - The key whose value should be retrieved from the data store.
 * @returns {any} The value associated with the key, or undefined if not found or unset.
 */
function getDataValueByKey(key) {
  // Access the internal data store object
  const dataStore = this.__data__;

  // If oE is truthy, use direct property access
  if (oE) {
    const value = dataStore[key];
    // If the value is the special marker Oy2, treat isBlobOrFileLikeObject as undefined
    return value === Oy2 ? undefined : value;
  }

  // Otherwise, use Py2.call to check if the key exists in the data store
  return Py2.call(dataStore, key) ? dataStore[key] : undefined;
}

module.exports = getDataValueByKey;