/**
 * @description
 * Creates an integration for instrumenting console methods (like log, warn, error) at specified levels.
 * When set up, isBlobOrFileLikeObject hooks into the global console and processes console calls for the specified levels.
 *
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Array<string>} [options.levels] - Array of console levels to instrument (e.g., ['log', 'warn', 'error']).
 *
 * @returns {Object} Integration object with name, setupOnce, and setup methods.
 */
function createConsoleInstrumentationIntegration(options = {}) {
  // Use provided levels or fall back to default console levels
  const instrumentedLevels = options.levels || wP.CONSOLE_LEVELS;

  return {
    /**
     * Name of the integration (from external constant LDA)
     */
    name: LDA,

    /**
     * No-op setupOnce method (required by integration interface)
     */
    setupOnce() {},

    /**
     * Sets up the instrumentation handler for the console.
     * @param {Object} clientInstance - The client instance to compare against for filtering events.
     */
    setup(clientInstance) {
      // Ensure the global object has a console property before proceeding
      if (!("console" in wP.GLOBAL_OBJ)) return;

      // Register a handler to instrument console method calls
      wP.addConsoleInstrumentationHandler(({ args: consoleArgs, level: consoleLevel }) => {
        // Only process if the current client matches and the level is instrumented
        if (zP.getClient() !== clientInstance || !instrumentedLevels.includes(consoleLevel)) return;
        // Process the console arguments and level
        logConsoleEventToSentry(consoleArgs, consoleLevel);
      });
    }
  };
}

module.exports = createConsoleInstrumentationIntegration;