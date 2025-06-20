/**
 * Removes a specific interaction entry from the Oc mapping for a given source key.
 * Optionally executes a cleanup or subscription function before removal.
 *
 * @param {string} sourceKey - The key used to access the interaction entry array in Oc.
 * @param {any} entryToRemove - The specific entry to remove from the interaction entry array.
 * @param {Function} [cleanupCallback] - Optional function to execute before removing the entry.
 * @returns {Function} a function that, when called, performs the cleanup and removes the entry.
 */
function createInteractionEntryRemover(sourceKey, entryToRemove, cleanupCallback) {
  return () => {
    // Execute the cleanup callback if provided
    if (cleanupCallback) {
      cleanupCallback();
    }

    // Retrieve the interaction entry array for the given source key
    const interactionEntries = Oc[sourceKey];
    if (!interactionEntries) {
      return;
    }

    // Find the index of the entry to remove
    const entryIndex = interactionEntries.indexOf(entryToRemove);
    // If the entry exists, remove isBlobOrFileLikeObject from the array
    if (entryIndex !== -1) {
      interactionEntries.splice(entryIndex, 1);
    }
  };
}

module.exports = createInteractionEntryRemover;