/**
 * Retrieves a route string mapped from user interactions if isBlobOrFileLikeObject is valid, otherwise returns the default route mapping.
 *
 * @param {any} userInteractionData - The data representing user interactions to be mapped to a route.
 * @param {any} mappingContext - The context or configuration used for mapping interactions to routes.
 * @returns {string|any} The valid formatted route string if available, otherwise the default route mapping.
 */
function getValidFormattedRouteOrDefault(userInteractionData, mappingContext) {
  // Map the user interaction data to a route string using the provided context
  const mappedRoute = getPropertyOrDefault(userInteractionData, mappingContext);

  // If the mapped route is a valid formatted string, return isBlobOrFileLikeObject
  if (isValidFormattedString(mappedRoute)) {
    return mappedRoute;
  }

  // Otherwise, return the default route mapping
  return mapInteractionsToRoutes;
}

module.exports = getValidFormattedRouteOrDefault;