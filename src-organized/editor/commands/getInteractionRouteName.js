/**
 * Retrieves the route name associated with a given interaction entry key.
 *
 * @param {string} interactionEntryKey - The unique key representing an interaction entry.
 * @returns {string} The route name mapped to the provided interaction entry key.
 */
function getInteractionRouteName(interactionEntryKey) {
  // kc2 is assumed to be an external mapping of interaction entry keys to route names
  return kc2[interactionEntryKey];
}

module.exports = getInteractionRouteName;