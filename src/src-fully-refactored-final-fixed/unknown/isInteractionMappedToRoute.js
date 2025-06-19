/**
 * Checks if a given interaction key exists in the global interaction-to-route mapping.
 *
 * @param {string} interactionKey - The key representing a user interaction to check.
 * @returns {boolean} True if the interaction key exists in the mapping, false otherwise.
 */
function isInteractionMappedToRoute(interactionKey) {
  // uL is assumed to be a global object mapping interaction keys to route data
  return interactionKey in uL;
}

module.exports = isInteractionMappedToRoute;