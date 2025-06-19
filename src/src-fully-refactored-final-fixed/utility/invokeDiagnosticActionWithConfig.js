/**
 * Invokes a diagnostic action method from the global 'diag' object, passing in a configuration object and additional arguments.
 *
 * @param {string} actionName - The name of the diagnostic action method to invoke (e.g., 'startUiActionClickTransaction').
 * @param {Object} config - The configuration object to prepend to the arguments list.
 * @param {Array} args - The array of additional arguments to pass to the diagnostic action method.
 * @returns {*} The result of the invoked diagnostic action method, or undefined if the global 'diag' object is not available.
 */
function invokeDiagnosticActionWithConfig(actionName, config, args) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diagnosticGlobal = ex4.getGlobal("diag");
  if (!diagnosticGlobal) {
    // If 'diag' is not available, exit early
    return;
  }
  // Prepend the config object to the arguments array
  args.unshift(config);
  // Dynamically invoke the specified action on the 'diag' object with the provided arguments
  return diagnosticGlobal[actionName](...args);
}

module.exports = invokeDiagnosticActionWithConfig;