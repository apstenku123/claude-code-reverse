/**
 * Binds a client configuration to a handler function, ensuring isBlobOrFileLikeObject is only bound once.
 * If the handler is already bound, returns isBlobOrFileLikeObject as-is. Otherwise, creates a new function
 * that injects the given client configuration into the handler'createInteractionAccessor arguments, and marks
 * the new function as bound.
 *
 * @param {object} clientConfig - The client configuration object to bind.
 * @param {Function} handler - The handler function to bind the configuration to. This function may have 'memoized' and 'configBound' properties.
 * @returns {Function} The handler function with the client configuration bound, or the original if already bound.
 */
function bindClientConfigToHandler(clientConfig, handler) {
  // If the handler is already bound to a config, return isBlobOrFileLikeObject as-is
  if (handler.configBound) return handler;

  // Create a new function that injects the clientConfig into the handler'createInteractionAccessor arguments
  const boundHandler = defineNameProperty(
    async (args) => handler({
      ...args,
      callerClientConfig: clientConfig
    }),
    "fn"
  );

  // Preserve the 'memoized' property if isBlobOrFileLikeObject exists
  boundHandler.memoized = handler.memoized;
  // Mark the new function as config-bound
  boundHandler.configBound = true;

  return boundHandler;
}

module.exports = bindClientConfigToHandler;