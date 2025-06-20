/**
 * Intercepts and overrides Function.prototype.toString to provide custom behavior for certain clients.
 *
 * This module allows you to override the default Function.prototype.toString method, so that for specific clients (as tracked by XQA),
 * the original function (as tracked by y09) is used when calling toString. This is useful for environments where you want to mask or
 * preserve the original function'createInteractionAccessor string representation, such as for security or instrumentation purposes.
 *
 * @returns {Object} An object with a name, setupOnce, and setup methods for managing the interception lifecycle.
 */
const functionToStringInterceptor = () => {
  return {
    /**
     * Name of the interceptor (external constant VQA).
     */
    name: VQA,

    /**
     * Sets up the Function.prototype.toString override once for the application lifecycle.
     * This ensures that for tracked clients, the original function'createInteractionAccessor toString is used.
     */
    setupOnce() {
      // Store the original Function.prototype.toString
      const originalFunctionToString = Function.prototype.toString;
      try {
        // Override Function.prototype.toString
        Function.prototype.toString = function (...args) {
          // Retrieve the original function if available
          const originalFunction = y09.getOriginalFunction(this);
          // Determine if the current client is tracked and if the original function exists
          const shouldUseOriginal = XQA.has(x09.getClient()) && originalFunction !== undefined;
          // Use the original function if conditions are met, otherwise use 'this'
          const targetFunction = shouldUseOriginal ? originalFunction : this;
          // Call the original toString with the appropriate context and arguments
          return originalFunctionToString.apply(targetFunction, args);
        };
      } catch (error) {
        // Silently ignore errors (e.g., if Function.prototype.toString is not writable)
      }
    },

    /**
     * Registers a client as tracked, so that the override applies to isBlobOrFileLikeObject.
     * @param {any} client - The client to register.
     */
    setup(client) {
      XQA.set(client, true);
    }
  };
};

module.exports = functionToStringInterceptor;
