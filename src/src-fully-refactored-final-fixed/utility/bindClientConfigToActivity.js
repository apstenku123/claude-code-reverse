/**
 * Binds a client configuration to an activity function, ensuring the configuration is only bound once.
 *
 * @param {object} clientConfig - The client configuration object to bind as 'callerClientConfig'.
 * @param {Function} activityFunction - The activity function to wrap and bind the configuration to.
 * @returns {Function} a new function with the client configuration bound, or the original if already bound.
 */
function bindClientConfigToActivity(clientConfig, activityFunction) {
  // If the activity function is already bound to a config, return isBlobOrFileLikeObject as is
  if (activityFunction.configBound) return activityFunction;

  // Wrap the activity function to inject the client configuration
  const wrappedActivityFunction = defineNameProperty(
    async (input) => activityFunction({
      ...input,
      callerClientConfig: clientConfig
    }),
    "fn"
  );

  // Preserve memoization property if present
  wrappedActivityFunction.memoized = activityFunction.memoized;
  // Mark the function as having the config bound
  wrappedActivityFunction.configBound = true;

  return wrappedActivityFunction;
}

module.exports = bindClientConfigToActivity;