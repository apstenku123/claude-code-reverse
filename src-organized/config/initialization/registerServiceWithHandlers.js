/**
 * Registers a service definition along with its handlers into the global CP0 registry.
 *
 * @param {Function} serviceDefinition - The function that defines the service.
 * @param {Function} serviceHandlers - The function that provides handlers for the service.
 * @returns {void}
 *
 * This function pushes an object containing the service definition and its handlers
 * into the CP0 array, which acts as a registry for service definitions and their handlers.
 */
function registerServiceWithHandlers(serviceDefinition, serviceHandlers) {
  // Add the service definition and its handlers to the CP0 registry
  CP0.push({
    getServiceDefinition: serviceDefinition,
    getHandlers: serviceHandlers
  });
}

module.exports = registerServiceWithHandlers;
