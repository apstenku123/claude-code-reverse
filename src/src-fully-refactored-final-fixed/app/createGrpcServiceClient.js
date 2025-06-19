/**
 * Creates a gRPC service client class with methods mapped from the provided service definition.
 *
 * @param {Object} serviceDefinition - The gRPC service definition object, where each key is a method name and value is the method'createInteractionAccessor config.
 * @param {string} serviceName - The name of the gRPC service.
 * @param {Object} [options={}] - Optional configuration for the client class.
 * @returns {typeof ws.Client} - a dynamically constructed gRPC client class with methods for each service method.
 */
function createGrpcServiceClient(serviceDefinition, serviceName, options = {}) {
  // Define a new client class extending the base ws.Client
  class GrpcClient extends ws.Client {}

  // Iterate over each method in the service definition
  Object.keys(serviceDefinition).forEach((methodName) => {
    // Skip method names that are considered internal or invalid
    if (zg1(methodName)) return;

    const methodConfig = serviceDefinition[methodName];
    let methodType;

    // Disallow method names starting with '$'
    if (typeof methodName === "string" && methodName.charAt(0) === "$") {
      throw new Error("Method names cannot start with $");
    }

    // Determine the gRPC method type
    if (methodConfig.requestStream) {
      if (methodConfig.responseStream) {
        methodType = "bidi"; // Bidirectional streaming
      } else {
        methodType = "client_stream"; // Client streaming
      }
    } else if (methodConfig.responseStream) {
      methodType = "server_stream"; // Server streaming
    } else {
      methodType = "unary"; // Unary call
    }

    // Destructure serialization/deserialization functions
    const {
      requestSerialize,
      responseDeserialize
    } = methodConfig;

    // Create the method implementation using g66
    const methodImplementation = g66(
      b66[methodType],
      methodConfig.path,
      requestSerialize,
      responseDeserialize
    );

    // Attach the method to the client prototype
    GrpcClient.prototype[methodName] = methodImplementation;
    // Copy all properties from the method config to the method implementation
    Object.assign(GrpcClient.prototype[methodName], methodConfig);

    // If an originalName exists and is valid, alias the method
    if (
      methodConfig.originalName &&
      !zg1(methodConfig.originalName)
    ) {
      GrpcClient.prototype[methodConfig.originalName] = GrpcClient.prototype[methodName];
    }
  });

  // Attach service metadata to the client class
  GrpcClient.service = serviceDefinition;
  GrpcClient.serviceName = serviceName;

  return GrpcClient;
}

module.exports = createGrpcServiceClient;