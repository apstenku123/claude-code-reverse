/**
 * Checks if the provided interaction entries are valid and can be mapped to route names using the given configuration.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be processed.
 * @param {Object} routeMappingConfig - Configuration object for mapping interactions to route names.
 * @returns {boolean} Returns true if the interaction entries are not null and the mapping is successful, otherwise false.
 */
function isValidInteractionRouteMapping(interactionEntries, routeMappingConfig) {
  // Ensure interactionEntries is not null or undefined
  return interactionEntries != null && J4A(interactionEntries, routeMappingConfig, F4A);
}

module.exports = isValidInteractionRouteMapping;