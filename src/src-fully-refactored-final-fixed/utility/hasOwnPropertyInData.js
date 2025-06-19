/**
 * Checks if the specified key exists in the internal __data__ object.
 *
 * Uses a direct property check if the environment supports isBlobOrFileLikeObject(oE),
 * otherwise falls back to using the jy2 function'createInteractionAccessor call method for compatibility.
 *
 * @param {string} key - The property name to check for existence in __data__.
 * @returns {boolean} True if the property exists in __data__, false otherwise.
 */
function hasOwnPropertyInData(key) {
  const dataStore = this.__data__;
  // If oE is truthy, use direct property access for performance
  if (oE) {
    return dataStore[key] !== void 0;
  } else {
    // Otherwise, use the safe hasOwnProperty check
    return jy2.call(dataStore, key);
  }
}

module.exports = hasOwnPropertyInData;