/**
 * Adds a value to the array associated with a given key in the global 'vy' object.
 * If the array does not exist for the specified key, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject first.
 *
 * @param {string} vyKey - The key in the 'vy' object to which the value should be added.
 * @param {*} valueToAdd - The value to add to the array associated with the given key.
 */
function addValueToVyEntry(vyKey, valueToAdd) {
  // Initialize the array for the given key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  vy[vyKey] = vy[vyKey] || [];
  // Add the new value to the array
  vy[vyKey].push(valueToAdd);
}

module.exports = addValueToVyEntry;