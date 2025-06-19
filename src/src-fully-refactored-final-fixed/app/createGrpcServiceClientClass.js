/**
 * Creates a gRPC service client class with methods mapped from the provided service definition.
 *
 * @param {Object} serviceDefinition - The gRPC service definition object, where each key is a method name and each value is the method'createInteractionAccessor configuration.
 * @param {string} serviceName - The name of the gRPC service.
 * @param {Object} [options={}] - Optional configuration object for the client class.
 * @returns {typeof ws.Client} - a dynamically generated client class with methods corresponding to the service definition.
 */
function createGrpcServiceClientClass(serviceDefinition, serviceName, options = {}) {
  // Define a new client class extending the base ws.Client
  class GrpcServiceClient extends ws.Client {}

  // Iterate over each method in the service definition
  Object.keys(serviceDefinition).forEach(methodName => {
    // Skip reserved or invalid method names
    if (zg1(methodName)) return;

    const methodConfig = serviceDefinition[methodName];
    let methodType;

    // Method names cannot start with $
    if (typeof methodName === "string" && methodName.charAt(0) === "$") {
      throw new Error("Method names cannot start with $");
    }

    // Determine the method type based on streaming properties
    if (methodConfig.requestStream) {
      if (methodConfig.responseStream) {
        methodType = "bidi"; // Bidirectional streaming
      } else {
        methodType = "client_stream"; // Client streaming only
      }
    } else if (methodConfig.responseStream) {
      methodType = "server_stream"; // Server streaming only
    } else {
      methodType = "unary"; // Unary (no streaming)
    }

    // Destructure serialization/deserialization functions
    const {
      requestSerialize,
      responseDeserialize
    } = methodConfig;

    // Create the method implementation using g66 and assign isBlobOrFileLikeObject to the prototype
    const methodImplementation = g66(b66[methodType], methodConfig.path, requestSerialize, responseDeserialize);
    GrpcServiceClient.prototype[methodName] = methodImplementation;

    // Copy all properties from the method config to the method implementation
    Object.assign(GrpcServiceClient.prototype[methodName], methodConfig);

    // If an originalName exists and is not reserved, alias the method
    if (methodConfig.originalName && !zg1(methodConfig.originalName)) {
      GrpcServiceClient.prototype[methodConfig.originalName] = GrpcServiceClient.prototype[methodName];
    }
  });

  // Attach service metadata to the client class
  GrpcServiceClient.service = serviceDefinition;
  GrpcServiceClient.serviceName = serviceName;

  return GrpcServiceClient;
}

module.exports = createGrpcServiceClientClass;