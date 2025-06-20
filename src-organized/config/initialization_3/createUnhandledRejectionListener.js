/**
 * Creates a plugin object that sets up a global listener for unhandled promise rejections.
 * When the plugin'createInteractionAccessor setup method is called, isBlobOrFileLikeObject attaches a handler to process unhandled promise rejections
 * using the provided context and configuration mode.
 *
 * @param {Object} [options={}] - Configuration options for the plugin.
 * @param {string} [options.mode="warn"] - Determines how unhandled rejections are handled (e.g., 'warn', 'error').
 * @returns {Object} Plugin object with name, setupOnce, and setup methods.
 */
function createUnhandledRejectionListener(options = {}) {
  // Determine the mode for handling unhandled rejections, defaulting to 'warn'
  const mode = options.mode || "warn";

  return {
    // Name of the plugin (external identifier)
    name: _ZA,

    // Placeholder for setupOnce lifecycle method (no-op)
    setupOnce() {},

    /**
     * Sets up the unhandledRejection event listener on the global process object.
     *
     * @param {Object} context - The context object passed to the setup method (typically Sentry'createInteractionAccessor Hub or similar).
     */
    setup(context) {
      // Attach the unhandledRejection event handler using the external createUnhandledRejectionHandler function
      global.process.on(
        "unhandledRejection",
        createUnhandledRejectionHandler(context, { mode })
      );
    }
  };
}

module.exports = createUnhandledRejectionListener;