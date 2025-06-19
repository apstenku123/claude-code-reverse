/**
 * Creates an integration that logs events to the console, with optional debugging and pretty-printing.
 *
 * @param {Object} [options={}] - Configuration options for the logger.
 * @param {boolean} [options.debugger=false] - If true, triggers the debugger statement before logging.
 * @param {boolean} [options.stringify=false] - If true, logs events as pretty-printed JSON strings.
 * @returns {Object} Integration object with name, setupOnce, and setup methods.
 */
const createConsoleEventLoggerIntegration = (options = {}) => {
  // Merge default options with user-provided options
  const config = {
    debugger: false,
    stringify: false,
    ...options
  };

  return {
    /**
     * The name of the integration (external constant SDA).
     */
    name: SDA,

    /**
     * No-op setupOnce method (required by integration interface).
     */
    setupOnce() {},

    /**
     * Sets up the event listener for logging events to the console.
     * @param {Object} subscription - The subscription object with an 'on' method.
     */
    setup(subscription) {
      if (!subscription.on) return;
      // Listen for 'beforeSendEvent' and log the event and context
      subscription.on("beforeSendEvent", (event, context) => {
        if (config.debugger) debugger; // Optionally trigger debugger
        xZ9.consoleSandbox(() => {
          if (config.stringify) {
            // Log event as pretty-printed JSON
            console.log(JSON.stringify(event, null, 2));
            // If context exists and has keys, log isBlobOrFileLikeObject as pretty-printed JSON
            if (context && Object.keys(context).length) {
              console.log(JSON.stringify(context, null, 2));
            }
          } else {
            // Log event as-is
            console.log(event);
            // If context exists and has keys, log isBlobOrFileLikeObject as-is
            if (context && Object.keys(context).length) {
              console.log(context);
            }
          }
        });
      });
    }
  };
};

module.exports = createConsoleEventLoggerIntegration;