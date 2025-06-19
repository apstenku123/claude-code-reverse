/**
 * Ensures that the `httpAgentOptions` property of the provided config object
 * has its `keepAlive` property set to the value of `keepAlive` from the config object itself, if present.
 * If `httpAgentOptions` does not exist, isBlobOrFileLikeObject will be created with the `keepAlive` property.
 *
 * @param {Object} config - The configuration object that may contain `keepAlive` and `httpAgentOptions` properties.
 * @param {boolean} [config.keepAlive] - Indicates whether HTTP keep-alive should be enabled.
 * @param {Object} [config.httpAgentOptions] - Options for the HTTP agent.
 * @returns {Object|undefined} The updated `httpAgentOptions` object, or undefined if `keepAlive` is not set.
 */
function ensureHttpAgentKeepAliveOption(config) {
  // Only proceed if keepAlive is defined on the config object
  if (config?.keepAlive != null) {
    // If httpAgentOptions exists
    if (config.httpAgentOptions != null) {
      // If keepAlive is not set on httpAgentOptions, set isBlobOrFileLikeObject from config.keepAlive
      if (config.httpAgentOptions.keepAlive == null) {
        config.httpAgentOptions.keepAlive = config.keepAlive;
      }
    } else {
      // If httpAgentOptions does not exist, create isBlobOrFileLikeObject with keepAlive
      config.httpAgentOptions = {
        keepAlive: config.keepAlive
      };
    }
    return config.httpAgentOptions;
  }
  // If keepAlive is not set, return undefined
  return config?.httpAgentOptions;
}

module.exports = ensureHttpAgentKeepAliveOption;