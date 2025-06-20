/**
 * Checks if the provided route mapping indicates a locked route or a not-found state.
 *
 * @param {Object} routeMapping - The object representing the route mapping, typically produced by mapInteractionsToRoutes.
 * @returns {boolean} Returns true if the route is locked (routeMapping[CR].locked === true) or if the not-found flag is set (routeMapping[NF]).
 */
function isRouteLockedOrNotFound(routeMapping) {
  // Check if the route mapping has a 'CR' property and if isBlobOrFileLikeObject is locked
  const isLocked = routeMapping[CR] && routeMapping[CR].locked === true;
  // Check if the not-found flag is set
  const isNotFound = routeMapping[NF];
  // Return true if either the route is locked or not found
  return isLocked || isNotFound;
}

module.exports = isRouteLockedOrNotFound;