/**
 * Retrieves the route mapping associated with a specific user interaction key.
 *
 * This function asynchronously fetches the current mapping of user interactions to routes,
 * then returns the route information associated with the provided interaction key.
 * If no mapping exists for the given key, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @function getRouteMappingByInteraction
 * @param {string} interactionKey - The unique key representing a user interaction.
 * @returns {Promise<any|null>} The route mapping object for the given interaction key, or null if not found.
 */
async function getRouteMappingByInteraction(interactionKey) {
  // Fetch the current mapping of user interactions to routes
  const interactionToRouteMap = await F71();
  // Return the mapping for the given interaction key, or null if not found
  return interactionToRouteMap[interactionKey] || null;
}

module.exports = getRouteMappingByInteraction;