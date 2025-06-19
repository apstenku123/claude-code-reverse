/**
 * Checks if a given interaction key exists in the interaction-to-route mapping.
 *
 * @param {string} interactionKey - The key representing a user interaction to check in the mapping.
 * @returns {boolean} True if the interaction key exists in the mapping; otherwise, false.
 */
function isInteractionRouteMapped(interactionKey) {
  // $D2 is assumed to be an external mapping object of interaction keys to route data
  return $D2[interactionKey] !== undefined;
}

module.exports = isInteractionRouteMapped;