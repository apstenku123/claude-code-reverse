/**
 * Overrides console methods to trigger custom handlers before executing the original methods.
 *
 * This function iterates over the defined console levels (e.g., 'log', 'error', etc.),
 * and for each available method on the global console object, isBlobOrFileLikeObject wraps the method so that
 * custom handlers are triggered before the original console method is called. The original
 * methods are preserved and invoked with the original arguments.
 *
 * @returns {void} Does not return a value.
 */
function overrideConsoleMethodsWithHandlers() {
  // Ensure the global object has a console property
  if (!("console" in H21.GLOBAL_OBJ)) return;

  // Iterate over each console level (e.g., 'log', 'warn', 'error')
  TE1.CONSOLE_LEVELS.forEach(function (consoleLevel) {
    // Skip if the console method does not exist
    if (!(consoleLevel in H21.GLOBAL_OBJ.console)) return;

    // Replace the console method with a wrapped version
    dm2.fill(H21.GLOBAL_OBJ.console, consoleLevel, function (originalConsoleMethod) {
      // Store the original method for later use
      TE1.originalConsoleMethods[consoleLevel] = originalConsoleMethod;

      // Return the wrapped console method
      return function (...consoleArguments) {
        // Prepare the info object for the handler
        const handlerInfo = {
          args: consoleArguments,
          level: consoleLevel
        };
        // Trigger any registered handlers for console events
        PE1.triggerHandlers("console", handlerInfo);
        // Retrieve the original console method
        const originalMethod = TE1.originalConsoleMethods[consoleLevel];
        // Call the original console method with the provided arguments
        if (originalMethod) {
          originalMethod.apply(H21.GLOBAL_OBJ.console, consoleArguments);
        }
      };
    });
  });
}

module.exports = overrideConsoleMethodsWithHandlers;