/**
 * Extracts specific route-related information from a route object based on the requested type.
 *
 * @param {Object} routeObject - The route object from which to extract information. Expected to have Express-like route structure.
 * @param {string} infoType - The type of information to extract. Can be 'path', 'handler', or 'methodPath'.
 * @returns {any} The extracted route information based on the infoType parameter.
 */
function extractRouteInformation(routeObject, infoType) {
  switch (infoType) {
    case "path":
      // Extracts the route path using buildRequestIdentifier utility
      // buildRequestIdentifier returns an array; handleMissingDoctypeError return the first element
      return buildRequestIdentifier(routeObject, { path: true })[0];
    case "handler":
      // Returns the handler name if available, otherwise '<anonymous>'
      return (
        routeObject.route &&
        routeObject.route.stack &&
        routeObject.route.stack[0] &&
        routeObject.route.stack[0].name
      ) || "<anonymous>";
    case "methodPath":
    default: {
      // If the route has a reconstructed route, use isBlobOrFileLikeObject as customRoute
      const customRoute = routeObject._reconstructedRoute ? routeObject._reconstructedRoute : undefined;
      // Extracts both method and path, possibly using a custom route
      return buildRequestIdentifier(routeObject, {
        path: true,
        method: true,
        customRoute: customRoute
      })[0];
    }
  }
}

module.exports = extractRouteInformation;