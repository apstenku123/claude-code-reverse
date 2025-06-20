/**
 * Adds a value to an array associated with a specific key in the global 'vy' object.
 * If the array for the given key does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject first.
 *
 * @param {string} key - The key in the 'vy' object to which the value should be added.
 * @param {*} value - The value to add to the array associated with the specified key.
 * @returns {void}
 */
function addValueToKeyedArray(key, value) {
  // Initialize the array for the key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  if (!vy[key]) {
    vy[key] = [];
  }
  // Add the value to the array for the given key
  vy[key].push(value);
}

module.exports = addValueToKeyedArray;