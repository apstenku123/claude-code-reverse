/**
 * Registers all services defined in the global CP0 array to the provided service registry.
 *
 * Iterates over each service definition in CP0, retrieves the service definition and its handlers,
 * and adds them to the given service registry using the addService method.
 *
 * @param {Object} serviceRegistry - The registry object that exposes an addService method.
 * @returns {void}
 */
function registerAllServices(serviceRegistry) {
  // Iterate over each service entry in the global CP0 array
  for (const {
    getServiceDefinition,
    getHandlers
  } of CP0) {
    // Add the service definition and its handlers to the registry
    serviceRegistry.addService(getServiceDefinition(), getHandlers());
  }
}

module.exports = registerAllServices;