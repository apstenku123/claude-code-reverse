/**
 * Creates an invoker object that can resolve method configurations based on a path string.
 *
 * @param {Object} options - The options object containing methodConfig.
 * @param {Object} options.methodConfig - The configuration object mapping methods to their settings.
 * @returns {Object} An object with `invoke` and `unref` methods.
 */
function createMethodConfigInvoker(options) {
  return {
    /**
     * Attempts to resolve a method configuration for the given path.
     *
     * @param {string} path - The path string, typically in the form 'service/method'.
     * @param {any} subscription - (Unused) Subscription or context parameter.
     * @returns {Object} An object containing the resolved methodConfig, pickInformation, status, and dynamicFilterFactories.
     */
    invoke(path, subscription) {
      // Split the path into service and method components
      const pathParts = path.split("/").filter(part => part.length > 0);
      const serviceName = pathParts[0] !== undefined && pathParts[0] !== null ? pathParts[0] : "";
      const methodName = pathParts[1] !== undefined && pathParts[1] !== null ? pathParts[1] : "";

      // If options and options.methodConfig exist, attempt to resolve a method config
      if (options && options.methodConfig) {
        for (const filter of o46) {
          // e46 attempts to resolve a method config for the given service/method/filter
          const resolvedConfig = e46(serviceName, methodName, options.methodConfig, filter);
          if (resolvedConfig) {
            return {
              methodConfig: resolvedConfig,
              pickInformation: {},
              status: Yg1.Status.processAndFormatTokens,
              dynamicFilterFactories: []
            };
          }
        }
      }

      // If no config found, return a default empty config
      return {
        methodConfig: {
          name: []
        },
        pickInformation: {},
        status: Yg1.Status.processAndFormatTokens,
        dynamicFilterFactories: []
      };
    },

    /**
     * Placeholder for unref logic (no-op).
     */
    unref() {}
  };
}

module.exports = createMethodConfigInvoker;