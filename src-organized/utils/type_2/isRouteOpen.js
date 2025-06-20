/**
 * Checks if the specified route is currently open.
 *
 * @param {Object} routeObject - The object representing a route, typically from mapInteractionsToRoutes.
 * @returns {boolean} True if the route is open, false otherwise.
 */
function isRouteOpen(routeObject) {
  // Check if the route'createInteractionAccessor status property equals the OPEN state
  return routeObject[ur] === pr.OPEN;
}

module.exports = isRouteOpen;