/**
 * Retrieves the mapped route name for a given interaction entry key.
 *
 * If the provided interactionEntryKey exists in the DL2 mapping object,
 * the corresponding mapped route name is returned. Otherwise, the original
 * interactionEntryKey is returned unchanged.
 *
 * @param {string} interactionEntryKey - The key representing an interaction entry to map to a route name.
 * @returns {string} The mapped route name if found in DL2, otherwise the original interactionEntryKey.
 */
function getMappedRouteName(interactionEntryKey) {
  // Check if the interactionEntryKey exists in the DL2 mapping object
  if (interactionEntryKey in DL2) {
    return DL2[interactionEntryKey];
  } else {
    // Return the original key if no mapping exists
    return interactionEntryKey;
  }
}

module.exports = getMappedRouteName;
