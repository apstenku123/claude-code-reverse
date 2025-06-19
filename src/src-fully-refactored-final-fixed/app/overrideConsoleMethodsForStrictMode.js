/**
 * Overrides console methods to support React DevTools Strict Mode logging behavior.
 *
 * This function wraps selected console methods (error, group, groupCollapsed, info, log, trace, warn)
 * so that, when React Strict Mode is enabled and the 'hideConsoleLogsInStrictMode' flag is set,
 * console output is suppressed. Otherwise, logs are processed and output as usual, with arguments
 * transformed as needed for React DevTools.
 *
 * The original console methods are preserved and can be restored by calling the function assigned to 'isSimplePropertyKey'.
 *
 * @function overrideConsoleMethodsForStrictMode
 * @returns {void} Does not return a value. Sets up global overrides.
 */
function overrideConsoleMethodsForStrictMode() {
  // List of console methods to override
  const consoleMethodsToOverride = [
    "error",
    "group",
    "groupCollapsed",
    "info",
    "log",
    "trace",
    "warn"
  ];

  // If overrides are already set up, exit early
  if (isSimplePropertyKey !== null) return;

  // Object to store original console methods
  const originalConsoleMethods = {};

  // Function to restore original console methods
  isSimplePropertyKey = function restoreOriginalConsoleMethods() {
    for (const methodName in originalConsoleMethods) {
      try {
        WY[methodName] = originalConsoleMethods[methodName];
      } catch (restoreError) {
        // Ignore errors during restoration
      }
    }
  };

  // Override each specified console method
  consoleMethodsToOverride.forEach(function (methodName) {
    try {
      // Save the original method (or its strict mode original if present)
      const originalMethod =
        originalConsoleMethods[methodName] =
          WY[methodName].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
            ? WY[methodName].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
            : WY[methodName];

      /**
       * Overridden console method for React DevTools Strict Mode.
       * Suppresses output if 'hideConsoleLogsInStrictMode' is true.
       * Otherwise, processes and outputs the log arguments.
       */
      function strictModeConsoleOverride(...args) {
        if (!NJ.hideConsoleLogsInStrictMode) {
          // Transform arguments for React DevTools and prepend BA
          originalMethod.apply(
            undefined,
            [BA].concat(reconcileChildNodes(withTransitionContext.apply(undefined, args)))
          );
        }
      }

      // Tag the override and original for restoration
      strictModeConsoleOverride.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
      originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = strictModeConsoleOverride;

      // Replace the console method with the override
      WY[methodName] = strictModeConsoleOverride;
    } catch (overrideError) {
      // Ignore errors during override
    }
  });
}

module.exports = overrideConsoleMethodsForStrictMode;