/**
 * Creates a logging integration for event subscriptions, allowing for optional debugging and pretty-printing.
 *
 * @param {Object} [options={}] - Configuration options for the logger.
 * @param {boolean} [options.debugger=false] - If true, triggers the debugger statement before logging.
 * @param {boolean} [options.stringify=false] - If true, logs events as pretty-printed JSON strings.
 * @returns {Object} Integration object with name, setupOnce, and setup methods.
 */
function createConsoleEventLogger(options = {}) {
  // Merge default options with user-provided options
  const config = {
    debugger: false,
    stringify: false,
    ...options
  };

  return {
    name: SDA, // Presumed external constant identifying this integration
    setupOnce() {
      // No-op: Required by interface but not used
    },
    /**
     * Sets up the event logger on the provided subscription object.
     * @param {Object} subscription - The event subscription object with an 'on' method.
     */
    setup(subscription) {
      if (!subscription.on) return;
      subscription.on("beforeSendEvent", (event, hint) => {
        // Trigger debugger if enabled in config
        if (config.debugger) debugger;
        xZ9.consoleSandbox(() => {
          // If stringify is enabled, log as pretty-printed JSON
          if (config.stringify) {
            console.log(JSON.stringify(event, null, 2));
            if (hint && Object.keys(hint).length) {
              console.log(JSON.stringify(hint, null, 2));
            }
          } else {
            // Otherwise, log as raw objects
            console.log(event);
            if (hint && Object.keys(hint).length) {
              console.log(hint);
            }
          }
        });
      });
    }
  };
}

module.exports = createConsoleEventLogger;