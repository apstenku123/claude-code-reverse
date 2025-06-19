/**
 * Removes an interaction entry from the l61 mapping by its key.
 *
 * @param {string} interactionKey - The key identifying the interaction entry to remove.
 * @returns {boolean} Returns true if the entry existed and was removed, false otherwise.
 */
function removeInteractionEntryByKey(interactionKey) {
  // Check if the interactionKey exists in the l61 mapping
  if (interactionKey in l61) {
    // Remove the entry from the mapping
    delete l61[interactionKey];
    return true;
  }
  // Entry does not exist
  return false;
}

module.exports = removeInteractionEntryByKey;