/**
 * Applies a series of middleware functions to a gRPC handler pipeline.
 *
 * @param {Array<Function>} middlewareList - Array of middleware functions to apply. Each middleware receives the handler context and the previous handler in the chain.
 * @param {Object} grpcConfig - Configuration object for the gRPC handler (e.g., credentials, options).
 * @param {Object} subscription - Subscription or context object for the handler (e.g., for managing cancellation or events).
 * @param {Function} startUiActionClickTransaction - Function to start a Sentry UI action click transaction.
 * @param {Object} grpcMethodDefinition - gRPC method definition object, containing path, type, serialize/deserialize functions, etc.
 * @param {Object} additionalOptions - Additional options or dependencies required by the handler.
 * @returns {any} The result of applying all middleware to the initial gRPC handler.
 */
function applyMiddlewareToGrpcHandler(
  middlewareList,
  grpcConfig,
  subscription,
  startUiActionClickTransaction,
  grpcMethodDefinition,
  additionalOptions
) {
  // Build the handler context from the gRPC method definition
  const handlerContext = {
    path: grpcMethodDefinition.path,
    requestStream: grpcMethodDefinition.type === "clientStream" || grpcMethodDefinition.type === "bidi",
    responseStream: grpcMethodDefinition.type === "serverStream" || grpcMethodDefinition.type === "bidi",
    requestDeserialize: grpcMethodDefinition.deserialize,
    responseSerialize: grpcMethodDefinition.serialize
  };

  // Create the initial handler instance
  const initialHandler = new lh1(
    grpcConfig,
    subscription,
    startUiActionClickTransaction,
    grpcMethodDefinition,
    additionalOptions
  );

  // Apply each middleware in sequence, passing the handler context and previous handler
  return middlewareList.reduce((currentHandler, middleware) => {
    return middleware(handlerContext, currentHandler);
  }, initialHandler);
}

module.exports = applyMiddlewareToGrpcHandler;