/**
 * @description
 * Integration for capturing console messages as breadcrumbs for error tracking.
 * Hooks into console instrumentation and adds breadcrumbs when console methods are called,
 * but only if the current client matches the provided client instance.
 *
 * @returns {object} Integration object with name, setupOnce, and setup methods.
 */
function consoleBreadcrumbIntegration() {
  return {
    /**
     * Name of the integration (imported from xGA)
     */
    name: xGA,

    /**
     * Placeholder for setupOnce lifecycle method (not used in this integration)
     */
    setupOnce() {},

    /**
     * Sets up the integration by adding a console instrumentation handler.
     *
     * @param {object} clientInstance - The client instance to associate with this integration.
     */
    setup(clientInstance) {
      // Register a handler to capture console calls
      yGA.addConsoleInstrumentationHandler(({ args: consoleArgs, level: consoleLevel }) => {
        // Only add breadcrumb if the current client matches the provided client instance
        if (g91.getClient() !== clientInstance) return;

        // Add a breadcrumb for the console call
        g91.addBreadcrumb(
          {
            category: "console",
            level: yGA.severityLevelFromString(consoleLevel),
            message: zQ9.format.apply(void 0, consoleArgs)
          },
          {
            input: [...consoleArgs],
            level: consoleLevel
          }
        );
      });
    }
  };
}

module.exports = consoleBreadcrumbIntegration;