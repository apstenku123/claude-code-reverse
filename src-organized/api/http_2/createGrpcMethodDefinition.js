/**
 * Constructs a gRPC method definition object based on the provided service method metadata, service name, serialization/deserialization helpers, and type registry.
 *
 * @param {Object} methodMetadata - The metadata describing the gRPC method (includes name, request/response types, streaming flags, and parsed options).
 * @param {string} serviceName - The name of the gRPC service this method belongs to.
 * @param {Object} serializationHelpers - Helpers or registry used for deserialization (e.g., type registry or context).
 * @param {Object} typeRegistry - Registry or context used for resolving type information.
 * @returns {Object} An object representing the gRPC method definition, including path, streaming flags, serialization/deserialization functions, type information, and options.
 */
function createGrpcMethodDefinition(methodMetadata, serviceName, serializationHelpers, typeRegistry) {
  // Destructure resolved request/response types from method metadata
  const {
    resolvedRequestType,
    resolvedResponseType
  } = methodMetadata;

  return {
    // Construct the gRPC method path
    path: `/${serviceName}/${methodMetadata.name}`,

    // Indicate if the request is a stream
    requestStream: Boolean(methodMetadata.requestStream),

    // Indicate if the response is a stream
    responseStream: Boolean(methodMetadata.responseStream),

    // Function to serialize the request
    requestSerialize: createObjectEncoder(resolvedRequestType),

    // Function to deserialize the request
    requestDeserialize: j_0(resolvedRequestType, serializationHelpers),

    // Function to serialize the response
    responseSerialize: createObjectEncoder(resolvedResponseType),

    // Function to deserialize the response
    responseDeserialize: j_0(resolvedResponseType, serializationHelpers),

    // The original method name (possibly transformed)
    originalName: GB6(methodMetadata.name),

    // The request type, resolved with the type registry
    requestType: Qh1(resolvedRequestType, typeRegistry),

    // The response type, resolved with the type registry
    responseType: Qh1(resolvedResponseType, typeRegistry),

    // Additional parsed options for the method
    options: JB6(methodMetadata.parsedOptions)
  };
}

module.exports = createGrpcMethodDefinition;