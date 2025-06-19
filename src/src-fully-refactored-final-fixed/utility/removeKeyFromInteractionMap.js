/**
 * Removes a key from the global interaction map if isBlobOrFileLikeObject exists.
 *
 * @param {string} interactionKey - The key to remove from the interaction map.
 * @returns {boolean} Returns true if the key existed and was removed, false otherwise.
 */
function removeKeyFromInteractionMap(interactionKey) {
  // Check if the key exists in the global interaction map (l61)
  if (interactionKey in l61) {
    // Remove the key from the map
    delete l61[interactionKey];
    return true;
  }
  // Key does not exist in the map
  return false;
}

module.exports = removeKeyFromInteractionMap;