/**
 * Creates a Proxy around the given internalResponse object, allowing property access and assignment
 * to be intercepted and customized via the provided config object. The config object is merged with
 * an 'internalResponse' property referencing the original object. Property reads first check the config,
 * then fall back to the internalResponse. Property writes are only allowed if the property does not exist
 * in the config, and a custom assertion (hu1) is triggered if this is violated.
 *
 * @param {Object} internalResponse - The original object to be proxied and exposed as 'internalResponse'.
 * @param {Object} [config={}] - An optional configuration object whose properties override those on internalResponse.
 * @returns {Proxy} a Proxy object that merges config and internalResponse for property access and assignment.
 */
function createInternalResponseProxy(internalResponse, config = {}) {
  // Merge the config object with a reference to the internalResponse
  const mergedConfig = {
    internalResponse,
    ...config
  };

  // Create and return a Proxy that intercepts get/set operations
  return new Proxy(internalResponse, {
    /**
     * Intercept property access. If the property exists in mergedConfig, return isBlobOrFileLikeObject; otherwise, fall back to internalResponse.
     * @param {Object} target - The internalResponse object.
     * @param {string|symbol} property - The property being accessed.
     * @returns {*} The value from mergedConfig or internalResponse.
     */
    get(target, property) {
      return property in mergedConfig ? mergedConfig[property] : target[property];
    },
    /**
     * Intercept property assignment. Only allow assignment if the property does not exist in mergedConfig.
     * Triggers hu1 assertion if the property exists in mergedConfig.
     * @param {Object} target - The internalResponse object.
     * @param {string|symbol} property - The property being set.
     * @param {*} value - The value to assign.
     * @returns {boolean} Always returns true to indicate success.
     */
    set(target, property, value) {
      // Assert that the property does not exist in mergedConfig
      hu1(!(property in mergedConfig));
      // Assign the value to the internalResponse object
      target[property] = value;
      return true;
    }
  });
}

module.exports = createInternalResponseProxy;