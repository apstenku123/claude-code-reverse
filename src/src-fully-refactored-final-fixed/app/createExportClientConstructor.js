/**
 * Creates a generic client constructor for the 'export' service endpoint.
 *
 * @param {string} exportPath - The path for the export service endpoint.
 * @param {any} clientOptions - Options to configure the generic client constructor.
 * @returns {any} The generic client constructor for the export service.
 */
function createExportClientConstructor(exportPath, clientOptions) {
  // Define the service definition for the export endpoint
  const serviceDefinition = {
    export: {
      path: exportPath, // The endpoint path for the export service
      requestStream: false, // Requests are not streamed
      responseStream: false, // Responses are not streamed
      // Identity function for request serialization
      requestSerialize: (request) => request,
      // Identity function for request deserialization
      requestDeserialize: (request) => request,
      // Identity function for response serialization
      responseSerialize: (response) => response,
      // Identity function for response deserialization
      responseDeserialize: (response) => response
    }
  };

  // Create and return the generic client constructor using TG6
  return TG6.makeGenericClientConstructor(serviceDefinition, clientOptions);
}

module.exports = createExportClientConstructor;