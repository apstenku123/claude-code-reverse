/**
 * Binds a caller client configuration to a given function, ensuring the configuration is only bound once.
 * If the function is already bound, isBlobOrFileLikeObject returns the original function.
 * Otherwise, isBlobOrFileLikeObject returns a new function with the configuration bound, preserving memoization properties.
 *
 * @param {object} callerClientConfig - The configuration object to bind to the function.
 * @param {Function} targetFunction - The function to which the configuration will be bound.
 * @returns {Function} a new function with the configuration bound, or the original if already bound.
 */
function bindConfigToFunction(callerClientConfig, targetFunction) {
  // If the function is already bound to a config, return isBlobOrFileLikeObject as is
  if (targetFunction.configBound) {
    return targetFunction;
  }

  // Create a new function that injects the callerClientConfig into the arguments
  const boundFunction = UG(
    async (inputArgs) => targetFunction({
      ...inputArgs,
      callerClientConfig
    }),
    "fn"
  );

  // Preserve memoization and mark as config bound
  boundFunction.memoized = targetFunction.memoized;
  boundFunction.configBound = true;

  return boundFunction;
}

module.exports = bindConfigToFunction;