/**
 * Checks if the given route interaction is locked or not found.
 *
 * This utility function inspects the provided route interaction object to determine if:
 *   1. The interaction has a 'locked' property set to true (via the CR key), or
 *   2. The interaction is considered 'not found' (via the NF key).
 *
 * @param {Object} routeInteraction - The route interaction object to check.
 * @returns {boolean} True if the interaction is locked or not found, otherwise false.
 */
function isRouteInteractionLockedOrNotFound(routeInteraction) {
  // Check if the route interaction has a 'locked' property set to true
  const isLocked = routeInteraction[CR] && routeInteraction[CR].locked === true;
  // Check if the route interaction is marked as 'not found'
  const isNotFound = routeInteraction[NF];
  // Return true if either condition is met
  return isLocked || isNotFound;
}

module.exports = isRouteInteractionLockedOrNotFound;