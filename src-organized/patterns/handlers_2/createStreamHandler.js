/**
 * Creates a stream handler function based on the specified handler type and configuration.
 *
 * Depending on the handler type (unary, clientStream, serverStream, bidi),
 * returns a function that either invokes a callback with an error or emits an error event on a stream.
 *
 * @param {string} handlerType - The type of gRPC handler ("unary", "clientStream", "serverStream", or "bidi").
 * @param {any} handlerConfig - The configuration or error object to be processed by getUnimplementedMethodError.
 * @returns {Function} a handler function appropriate for the specified handler type.
 * @throws {Error} Throws if an invalid handler type is provided.
 */
function createStreamHandler(handlerType, handlerConfig) {
  // Process the configuration or error object using getUnimplementedMethodError
  const processedError = getUnimplementedMethodError(handlerConfig);

  switch (handlerType) {
    case "unary":
      // For unary handlers, return a function that calls the callback with the error
      return (request, callback) => {
        callback(processedError, null);
      };
    case "clientStream":
      // For client streaming handlers, return a function that calls the callback with the error
      return (stream, callback) => {
        callback(processedError, null);
      };
    case "serverStream":
      // For server streaming handlers, return a function that emits an error event on the stream
      return stream => {
        stream.emit("error", processedError);
      };
    case "bidi":
      // For bidirectional streaming handlers, return a function that emits an error event on the stream
      return stream => {
        stream.emit("error", processedError);
      };
    default:
      // Throw an error if the handler type is invalid
      throw new Error(`Invalid handlerType ${handlerType}`);
  }
}

module.exports = createStreamHandler;