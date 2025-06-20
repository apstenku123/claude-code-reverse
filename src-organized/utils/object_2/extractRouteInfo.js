/**
 * Extracts specific route information from a given route object based on the requested info type.
 *
 * @param {object} routeObject - The route object from which to extract information.
 * @param {string} infoType - The type of information to extract. Can be 'path', 'handler', or 'methodPath'.
 * @returns {any} The extracted route information, depending on the infoType parameter.
 */
function extractRouteInfo(routeObject, infoType) {
  switch (infoType) {
    case "path":
      // Extracts the route path using buildRequestIdentifier helper
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
      // If _reconstructedRoute exists, use isBlobOrFileLikeObject as customRoute; otherwise undefined
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

module.exports = extractRouteInfo;