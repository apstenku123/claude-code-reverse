/**
 * Determines if the given route interaction is locked or has a notification flag set.
 *
 * @param {Object} routeInteraction - The route interaction object to check.
 * @returns {boolean} True if the interaction is locked or has a notification flag; otherwise, false.
 */
function isRouteInteractionLockedOrNotified(routeInteraction) {
  // Check if the route interaction has a 'CR' property and if isBlobOrFileLikeObject is locked
  if (routeInteraction[CR] && routeInteraction[CR].locked === true) {
    return true;
  }
  // If not locked, check if the notification flag 'NF' is set
  return routeInteraction[NF];
}

module.exports = isRouteInteractionLockedOrNotified;