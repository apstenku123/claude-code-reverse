/**
 * Creates a gRPC error handler function based on the handler type and error configuration.
 *
 * @param {string} handlerType - The type of gRPC handler ("unary", "clientStream", "serverStream", or "bidi").
 * @param {any} errorConfig - The configuration or error object to be processed by getUnimplementedMethodError.
 * @returns {Function} a handler function appropriate for the specified handler type.
 * @throws {Error} If an invalid handler type is provided.
 */
function createGrpcErrorHandler(handlerType, errorConfig) {
  // Process the error configuration to get the error object
  const grpcError = getUnimplementedMethodError(errorConfig);

  switch (handlerType) {
    case "unary":
      // For unary handlers, return a function that calls the callback with the error
      return (request, callback) => {
        callback(grpcError, null);
      };
    case "clientStream":
      // For client stream handlers, return a function that calls the callback with the error
      return (stream, callback) => {
        callback(grpcError, null);
      };
    case "serverStream":
      // For server stream handlers, return a function that emits the error on the stream
      return stream => {
        stream.emit("error", grpcError);
      };
    case "bidi":
      // For bidirectional stream handlers, return a function that emits the error on the stream
      return stream => {
        stream.emit("error", grpcError);
      };
    default:
      // Throw an error if the handler type is invalid
      throw new Error(`Invalid handlerType ${handlerType}`);
  }
}

module.exports = createGrpcErrorHandler;