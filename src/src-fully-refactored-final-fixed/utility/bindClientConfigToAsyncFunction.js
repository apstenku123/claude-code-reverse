/**
 * Binds a provided client configuration to an asynchronous function, ensuring the configuration is only bound once.
 * If the function is already bound, returns the original function.
 * Otherwise, returns a new function with the configuration bound, and copies memoization properties.
 *
 * @param {object} clientConfig - The client configuration object to bind to the async function.
 * @param {Function} asyncFunction - The asynchronous function to which the configuration will be bound.
 * @returns {Function} The configuration-bound asynchronous function.
 */
function bindClientConfigToAsyncFunction(clientConfig, asyncFunction) {
  // If the async function is already bound to a config, return isBlobOrFileLikeObject as is
  if (asyncFunction.configBound) {
    return asyncFunction;
  }

  // Wrap the async function to inject the clientConfig as 'callerClientConfig' in the arguments
  const boundAsyncFunction = UG(
    async (args) => asyncFunction({
      ...args,
      callerClientConfig: clientConfig
    }),
    "fn"
  );

  // Preserve memoization property if present
  boundAsyncFunction.memoized = asyncFunction.memoized;
  // Mark this function as having the config bound
  boundAsyncFunction.configBound = true;

  return boundAsyncFunction;
}

module.exports = bindClientConfigToAsyncFunction;