/**
 * Registers a global uncaught exception handler for the Node.js process.
 *
 * @function registerUncaughtExceptionHandler
 * @description
 * Sets up a handler for uncaught exceptions using the provided configuration. The handler is registered globally on the process object and can be customized via the options parameter.
 *
 * @param {Object} [options={}] - Configuration options for the handler.
 * @param {boolean} [options.exitEvenIfOtherHandlersAreRegistered=true] - Whether to exit even if other handlers are registered.
 * @returns {Object} An object containing the handler'createInteractionAccessor name and setup methods.
 */
const registerUncaughtExceptionHandler = (options = {}) => {
  // Merge default configuration with user-provided options
  const config = {
    exitEvenIfOtherHandlersAreRegistered: true,
    ...options
  };

  return {
    /**
     * Name of the handler (external constant).
     */
    name: RZA,

    /**
     * Placeholder for setupOnce lifecycle method (no-op).
     */
    setupOnce() {},

    /**
     * Registers the uncaught exception handler on the global process object.
     * @param {any} subscription - The subscription/context for the handler.
     */
    setup(subscription) {
      // Attach the uncaughtException handler using the external TZA factory
      global.process.on("uncaughtException", TZA(subscription, config));
    }
  };
};

module.exports = registerUncaughtExceptionHandler;
