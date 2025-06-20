/**
 * Registers a global listener for unhandled promise rejections in Node.js,
 * using the provided configuration. When an unhandled rejection occurs,
 * the handler returned by createUnhandledRejectionHandler is invoked with the given options.
 *
 * @param {Object} [options={}] - Configuration options for the listener.
 * @param {string} [options.mode="warn"] - The mode in which to handle unhandled rejections (e.g., 'warn', 'strict').
 * @returns {Object} An object with name, setupOnce, and setup methods for integration.
 */
function registerUnhandledRejectionListener(options = {}) {
  const mode = options.mode || "warn";

  return {
    /**
     * Name identifier for this integration (external dependency _ZA).
     */
    name: _ZA,

    /**
     * Placeholder for setupOnce, required by integration interface.
     */
    setupOnce() {},

    /**
     * Sets up the unhandledRejection listener using the provided context.
     * @param {Object} integrationContext - The context or integration instance.
     */
    setup(integrationContext) {
      // Attach a global handler for unhandled promise rejections
      global.process.on(
        "unhandledRejection",
        createUnhandledRejectionHandler(integrationContext, { mode })
      );
    }
  };
}

module.exports = registerUnhandledRejectionListener;