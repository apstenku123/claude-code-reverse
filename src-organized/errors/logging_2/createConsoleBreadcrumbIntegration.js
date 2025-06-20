/**
 * @description
 * Creates an integration that instruments console calls and adds them as breadcrumbs for error tracking.
 * This integration hooks into console methods (like log, warn, error) and records their usage as breadcrumbs,
 * provided the current client matches the integration'createInteractionAccessor client instance.
 *
 * @returns {object} Integration object with name, setupOnce, and setup methods
 */
function createConsoleBreadcrumbIntegration() {
  return {
    /**
     * The name of the integration, imported from xGA (external constant).
     * @type {string}
     */
    name: xGA,

    /**
     * Placeholder for setupOnce lifecycle method (not used in this integration).
     */
    setupOnce() {},

    /**
     * Sets up the integration for a specific client instance.
     *
     * @param {object} clientInstance - The client instance this integration is attached to.
     */
    setup(clientInstance) {
      // Register a handler to instrument console calls
      yGA.addConsoleInstrumentationHandler(({ args: consoleArgs, level: consoleLevel }) => {
        // Only add breadcrumb if the current client matches the integration'createInteractionAccessor client
        if (g91.getClient() !== clientInstance) return;

        // Add a breadcrumb for this console call
        g91.addBreadcrumb(
          {
            category: "console",
            level: yGA.severityLevelFromString(consoleLevel),
            message: zQ9.format.apply(void 0, consoleArgs)
          },
          {
            input: [...consoleArgs], // Copy of original console arguments
            level: consoleLevel
          }
        );
      });
    }
  };
}

module.exports = createConsoleBreadcrumbIntegration;