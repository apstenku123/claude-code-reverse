/**
 * Registers a global handler for unhandled promise rejections in the Node.js process.
 *
 * @param {Object} [options={}] - Configuration options for the handler.
 * @param {string} [options.mode="warn"] - The mode to use for handling unhandled rejections (e.g., 'warn', 'error').
 * @returns {Object} An object containing the handler'createInteractionAccessor name and setup methods.
 */
const registerUnhandledRejectionHandler = (options = {}) => {
  // Determine the mode for handling unhandled rejections, defaulting to 'warn'
  const mode = options.mode || "warn";

  return {
    // Name of the handler, provided by external dependency _ZA
    name: _ZA,

    // Placeholder for setupOnce, currently does nothing
    setupOnce() {},

    /**
     * Sets up the unhandledRejection handler on the global process object.
     * @param {Object} sentryInstance - The Sentry instance or context object.
     */
    setup(sentryInstance) {
      // Attach the unhandledRejection event handler using createUnhandledRejectionHandler, passing the Sentry instance and mode
      global.process.on(
        "unhandledRejection",
        createUnhandledRejectionHandler(sentryInstance, { mode })
      );
    }
  };
};

module.exports = registerUnhandledRejectionHandler;