/**
 * Associates a route interaction handler with a specific route key in the global route-handler registry.
 *
 * @param {string} routeKey - The unique identifier for the route or interaction.
 * @param {Function} interactionHandler - The handler function to be executed for the specified route.
 * @returns {void}
 *
 * This function updates the global Rg object by assigning the provided interaction handler
 * to the specified route key. If the key already exists, its handler will be overwritten.
 */
function setRouteInteractionHandler(routeKey, interactionHandler) {
  // Assign the interaction handler to the route key in the global registry
  Rg[routeKey] = interactionHandler;
}

module.exports = setRouteInteractionHandler;
