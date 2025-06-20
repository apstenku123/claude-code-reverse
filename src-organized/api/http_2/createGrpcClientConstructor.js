/**
 * Creates a generic gRPC client constructor with basic serialization and deserialization logic.
 *
 * @param {string} servicePath - The gRPC service path (e.g., '/package.Service/Method').
 * @param {object} clientOptions - Configuration options for the client constructor.
 * @returns {Function} - The generated gRPC client constructor.
 */
function createGrpcClientConstructor(servicePath, clientOptions) {
  // Define the service definition with default serialization/deserialization logic
  const serviceDefinition = {
    export: {
      path: servicePath,
      requestStream: false,
      responseStream: false,
      // Pass-through serialization for requests
      requestSerialize: request => request,
      // Pass-through deserialization for requests
      requestDeserialize: request => request,
      // Pass-through serialization for responses
      responseSerialize: response => response,
      // Pass-through deserialization for responses
      responseDeserialize: response => response
    }
  };

  // Use TG6'createInteractionAccessor utility to create a generic client constructor
  return TG6.makeGenericClientConstructor(serviceDefinition, clientOptions);
}

module.exports = createGrpcClientConstructor;