/**
 * Registers all services defined in the CP0 collection to the provided service registry.
 *
 * Iterates through each service definition in the global CP0 array, retrieves the service definition
 * and its associated handlers, and adds them to the given service registry via addService().
 *
 * @param {Object} serviceRegistry - The registry object that exposes an addService() method for registering services.
 * @returns {void}
 */
function registerCP0Services(serviceRegistry) {
  // Iterate over each service entry in the CP0 collection
  for (const {
    getServiceDefinition,
    getHandlers
  } of CP0) {
    // Retrieve the service definition and its handlers, then register them
    serviceRegistry.addService(getServiceDefinition(), getHandlers());
  }
}

module.exports = registerCP0Services;