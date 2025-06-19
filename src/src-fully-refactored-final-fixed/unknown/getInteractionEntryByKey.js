/**
 * Retrieves an interaction entry by its key from the current interaction entries map.
 *
 * @async
 * @function getInteractionEntryByKey
 * @param {string} entryKey - The key identifying the interaction entry to retrieve.
 * @returns {Promise<any|null>} Resolves to the interaction entry if found, otherwise null.
 *
 * @example
 * const entry = await getInteractionEntryByKey('route-123');
 * if (entry) {
 *   // process entry
 * }
 */
async function getInteractionEntryByKey(entryKey) {
  // Await the map/object containing all interaction entries
  const interactionEntries = await F71();
  // Return the entry for the given key, or null if not found
  return interactionEntries[entryKey] || null;
}

module.exports = getInteractionEntryByKey;