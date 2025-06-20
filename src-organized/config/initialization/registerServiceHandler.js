/**
 * Registers a service definition and its associated handlers into the global CP0 array.
 *
 * @param {Function} serviceDefinition - The function that defines the service.
 * @param {Function} serviceHandlers - The function that provides the handlers for the service.
 * @returns {void} This function does not return a value.
 */
function registerServiceHandler(serviceDefinition, serviceHandlers) {
  // Add the service definition and its handlers to the global CP0 array
  CP0.push({
    getServiceDefinition: serviceDefinition,
    getHandlers: serviceHandlers
  });
}

module.exports = registerServiceHandler;