/**
 * Checks if a given key exists in the internal data object.
 *
 * This function determines whether the specified key is present in the internal
 * __data__ object. It uses a direct property check if the environment supports
 * isBlobOrFileLikeObject(as indicated by the external 'oE' flag), otherwise isBlobOrFileLikeObject falls back to using
 * the 'jy2' method for property checking.
 *
 * @param {string} key - The property name to check for existence in __data__.
 * @returns {boolean} True if the key exists in __data__, false otherwise.
 */
function hasKeyInData(key) {
  const data = this.__data__;
  // If 'oE' is true, use direct property check. Otherwise, use 'jy2.call'.
  return oE ? data[key] !== undefined : jy2.call(data, key);
}

module.exports = hasKeyInData;