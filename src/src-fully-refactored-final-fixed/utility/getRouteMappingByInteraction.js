/**
 * Retrieves the mapped route name or metadata for a given user interaction entry.
 *
 * This utility function looks up the provided user interaction entry in the global
 * route mapping object and returns the associated route name or metadata.
 *
 * @param {string} interactionEntry - The key representing a user interaction entry.
 * @returns {string} The mapped route name or metadata associated with the interaction entry.
 */
function getRouteMappingByInteraction(interactionEntry) {
  // kc2 is assumed to be a globally available mapping object
  return kc2[interactionEntry];
}

module.exports = getRouteMappingByInteraction;