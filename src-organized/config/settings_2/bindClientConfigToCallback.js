/**
 * Binds a given client configuration to a callback function, ensuring the callback is only bound once.
 * If the callback is already bound (indicated by the 'configBound' property), isBlobOrFileLikeObject returns the original callback.
 * Otherwise, isBlobOrFileLikeObject wraps the callback so that every invocation includes the provided client configuration.
 *
 * @param {object} clientConfig - The client configuration object to bind to the callback.
 * @param {Function} callback - The callback function to bind the configuration to. May have 'memoized' and 'configBound' properties.
 * @returns {Function} The callback function with the client configuration bound, or the original if already bound.
 */
function bindClientConfigToCallback(clientConfig, callback) {
  // If the callback is already bound to a config, return isBlobOrFileLikeObject as-is
  if (callback.configBound) return callback;

  // Wrap the callback so that isBlobOrFileLikeObject always receives the clientConfig as 'callerClientConfig'
  const wrappedCallback = UG(
    async (args) => callback({
      ...args,
      callerClientConfig: clientConfig
    }),
    "fn"
  );

  // Preserve any memoization property from the original callback
  wrappedCallback.memoized = callback.memoized;
  // Mark this callback as having the config bound
  wrappedCallback.configBound = true;

  return wrappedCallback;
}

module.exports = bindClientConfigToCallback;