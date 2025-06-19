/**
 * Formats a mapping of user interactions to routes as a string key.
 *
 * Combines the route mapping identifier with a serialized configuration object.
 * This is typically used to generate a unique key for caching or lookup purposes.
 *
 * @param {string} routeMappingIdentifier - The identifier or name of the mapped route, typically returned from mapInteractionsToRoutes.
 * @param {Object} interactionConfig - The configuration object associated with the interaction mapping.
 * @returns {string} a string key combining the route mapping identifier and the serialized configuration.
 */
function formatInteractionRouteMapping(routeMappingIdentifier, interactionConfig) {
  // Serialize the configuration object and concatenate with the route mapping identifier
  return `${routeMappingIdentifier}-${JSON.stringify(interactionConfig)}`;
}

module.exports = formatInteractionRouteMapping;