/**
 * Retrieves the mapped route name for a given interaction key if isBlobOrFileLikeObject exists in the DL2 mapping.
 * If the key is not present in DL2, returns the original key.
 *
 * @param {string} interactionKey - The key representing a user interaction or route.
 * @returns {string} The mapped route name if found in DL2, otherwise the original interaction key.
 */
function getMappedRouteOrOriginal(interactionKey) {
  // Check if the interaction key exists in the DL2 mapping object
  if (interactionKey in DL2) {
    // Return the mapped route name
    return DL2[interactionKey];
  } else {
    // Return the original key if no mapping exists
    return interactionKey;
  }
}

module.exports = getMappedRouteOrOriginal;
