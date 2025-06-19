/**
 * Registers a service definition and its associated handlers into the global CP0 registry.
 *
 * @param {Function} getServiceDefinition - Function that returns the service definition object.
 * @param {Function} getHandlers - Function that returns the handlers for the service.
 * @returns {void}
 *
 * This function pushes an object containing the service definition and its handlers
 * into the global CP0 array for later retrieval or processing.
 */
function registerServiceDefinition(getServiceDefinition, getHandlers) {
  // Add the service definition and its handlers to the CP0 registry
  CP0.push({
    getServiceDefinition: getServiceDefinition,
    getHandlers: getHandlers
  });
}

module.exports = registerServiceDefinition;