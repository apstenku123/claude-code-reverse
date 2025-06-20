/**
 * Temporarily overrides console methods with custom implementations during the execution of a callback.
 * Restores the original console methods after the callback completes, even if an error is thrown.
 *
 * @param {Function} callback - The function to execute while console methods are overridden. Typically, this processes interaction entries.
 * @returns {*} The return value of the callback function.
 */
function withTemporaryConsoleOverrides(callback) {
  // Ensure the global object has a console property
  if (!("console" in NE1.GLOBAL_OBJ)) {
    return callback();
  }

  const globalConsole = NE1.GLOBAL_OBJ.console;
  const originalConsoleMethods = {};
  // Get the list of console methods to override from qE1
  const methodsToOverride = Object.keys(qE1);

  // Override each specified console method with the custom implementation
  methodsToOverride.forEach(methodName => {
    const customImplementation = qE1[methodName];
    originalConsoleMethods[methodName] = globalConsole[methodName];
    globalConsole[methodName] = customImplementation;
  });

  try {
    // Execute the callback while console methods are overridden
    return callback();
  } finally {
    // Restore the original console methods
    methodsToOverride.forEach(methodName => {
      globalConsole[methodName] = originalConsoleMethods[methodName];
    });
  }
}

module.exports = withTemporaryConsoleOverrides;