/**
 * Retrieves the current mapping of user interactions to routes.
 * If no mapping exists, performs necessary setup and returns a default mapping.
 *
 * @returns {any} The current user interaction to route mapping, or a default mapping if none exists.
 */
function getMappedUserInteractionRoutes() {
  // Attempt to retrieve the current mapping of user interactions to routes
  const userInteractionRouteMapping = mapInteractionsToRoutes();

  // If no mapping exists, perform setup and return a default mapping
  if (userInteractionRouteMapping === null) {
    initializeRouteMapping(); // Equivalent to TP4()
    return setDefaultRouteMapping(getDefaultRouteMapping()); // Equivalent to getPoetryMetadataByKey(oQ())
  }

  // Return the existing mapping
  return userInteractionRouteMapping;
}

module.exports = getMappedUserInteractionRoutes;