/**
 * Retrieves the route name associated with a given user interaction entry.
 *
 * @param {string} interactionKey - The key representing a specific user interaction.
 * @returns {string} The corresponding route name if found; otherwise, returns "unknown".
 */
function getRouteNameFromInteraction(interactionKey) {
  // bK6 is assumed to be a mapping of interaction keys to route names
  return bK6[interactionKey] || "unknown";
}

module.exports = getRouteNameFromInteraction;