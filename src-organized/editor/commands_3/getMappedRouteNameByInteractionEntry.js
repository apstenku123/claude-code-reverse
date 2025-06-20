/**
 * Retrieves the mapped route name and related context for a given interaction entry key.
 *
 * This function asynchronously obtains the mapping of interaction entries to route names and context,
 * then returns the value associated with the provided interaction entry key. If the key does not exist
 * in the mapping, the function returns null.
 *
 * @async
 * @function getMappedRouteNameByInteractionEntry
 * @param {string} interactionEntryKey - The unique key representing an interaction entry.
 * @returns {Promise<any>} The mapped route name and context for the given interaction entry key, or null if not found.
 */
async function getMappedRouteNameByInteractionEntry(interactionEntryKey) {
  // Retrieve the mapping of interaction entries to route names and context
  const interactionEntryToRouteMap = await F71();

  // Return the mapped value for the provided key, or null if not found
  return interactionEntryToRouteMap[interactionEntryKey] || null;
}

module.exports = getMappedRouteNameByInteractionEntry;
