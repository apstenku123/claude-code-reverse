/**
 * @description
 * Integration that intercepts Function.prototype.toString to return the original function'createInteractionAccessor string representation
 * if available, otherwise falls back to the default behavior. It also allows enabling this interception for specific clients.
 *
 * @returns {Object} Integration object with name, setupOnce, and setup methods
 */
function functionToStringInterceptorIntegration() {
  return {
    /**
     * Name of the integration (external constant VQA)
     */
    name: VQA,

    /**
     * Sets up the interception of Function.prototype.toString globally.
     * Stores the original toString method, then overrides isBlobOrFileLikeObject to check for an original function
     * via y09.getOriginalFunction. If the current client is enabled in XQA, uses the original function;
     * otherwise, uses the current function context.
     */
    setupOnce() {
      // Store the original Function.prototype.toString
      const originalFunctionToString = Function.prototype.toString;
      try {
        // Override Function.prototype.toString
        Function.prototype.toString = function (...args) {
          // Attempt to retrieve the original function for this context
          const originalFunction = y09.getOriginalFunction(this);
          // If the current client is enabled and an original function exists, use isBlobOrFileLikeObject; otherwise, use this
          const functionContext = XQA.has(x09.getClient()) && originalFunction !== undefined
            ? originalFunction
            : this;
          // Call the original toString with the determined context
          return originalFunctionToString.apply(functionContext, args);
        };
      } catch (error) {
        // Silently ignore errors (e.g., if Function.prototype.toString is not writable)
      }
    },

    /**
     * Enables the interception for a specific client by adding isBlobOrFileLikeObject to the XQA set.
     * @param {any} client - The client object to enable interception for
     */
    setup(client) {
      XQA.set(client, true);
    }
  };
}

module.exports = functionToStringInterceptorIntegration;