/**
 * Registers all services defined in the global CP0 array to the provided service registry.
 * Each entry in CP0 should provide a getServiceDefinition and getHandlers method.
 *
 * @param {Object} serviceRegistry - The registry object that exposes an addService method.
 * @returns {void}
 */
function registerAllServicesFromDefinitions(serviceRegistry) {
  // Iterate over each service definition in the global CP0 array
  for (const {
    getServiceDefinition,
    getHandlers
  } of CP0) {
    // Add the service to the registry with its definition and handlers
    serviceRegistry.addService(getServiceDefinition(), getHandlers());
  }
}

module.exports = registerAllServicesFromDefinitions;