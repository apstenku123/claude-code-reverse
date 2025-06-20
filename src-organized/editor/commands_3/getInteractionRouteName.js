/**
 * Retrieves the route name associated with a given interaction entry key.
 *
 * @param {string} interactionEntryKey - The key representing an interaction entry.
 * @returns {string} The route name associated with the interaction entry key, or 'unknown' if not found.
 */
function getInteractionRouteName(interactionEntryKey) {
  // bK6 is assumed to be an external mapping of interaction entry keys to route names
  return bK6[interactionEntryKey] || "unknown";
}

module.exports = getInteractionRouteName;