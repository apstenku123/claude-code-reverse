/**
 * Binds a client configuration to an asynchronous handler function, ensuring the handler is only bound once.
 * If the handler is already bound (configBound), isBlobOrFileLikeObject returns the original handler.
 * Otherwise, isBlobOrFileLikeObject wraps the handler to inject the callerClientConfig and marks isBlobOrFileLikeObject as bound.
 *
 * @param {object} clientConfig - The client configuration object to bind to the handler.
 * @param {Function} asyncHandler - The asynchronous handler function to wrap and bind.
 * @returns {Function} The wrapped handler function with the client configuration bound, or the original if already bound.
 */
function bindClientConfigToAsyncHandler(clientConfig, asyncHandler) {
  // If the handler is already bound to a config, return as is
  if (asyncHandler.configBound) return asyncHandler;

  // Wrap the handler to inject the clientConfig into the callerClientConfig property
  const wrappedHandler = defineNameProperty(
    async (handlerArgs) => asyncHandler({
      ...handlerArgs,
      callerClientConfig: clientConfig
    }),
    "fn"
  );

  // Preserve memoization and mark as config bound
  wrappedHandler.memoized = asyncHandler.memoized;
  wrappedHandler.configBound = true;

  return wrappedHandler;
}

module.exports = bindClientConfigToAsyncHandler;