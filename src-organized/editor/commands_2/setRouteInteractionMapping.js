/**
 * Associates a given route interaction key with its corresponding configuration or handler.
 * This function updates the global Rg mapping with the provided key-value pair.
 *
 * @param {string} routeInteractionKey - The unique key representing a route interaction.
 * @param {any} routeInteractionConfig - The configuration or handler to associate with the route interaction key.
 * @returns {void}
 */
function setRouteInteractionMapping(routeInteractionKey, routeInteractionConfig) {
  // Update the global mapping with the new route interaction configuration
  Rg[routeInteractionKey] = routeInteractionConfig;
}

module.exports = setRouteInteractionMapping;