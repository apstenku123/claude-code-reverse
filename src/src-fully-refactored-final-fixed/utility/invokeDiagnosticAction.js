/**
 * Invokes a diagnostic action method with the provided arguments.
 *
 * This utility function retrieves the global 'diag' object and, if present,
 * prepends the configuration object to the arguments array, then calls the
 * specified diagnostic method with those arguments. If the global 'diag' object
 * is not available, the function returns undefined.
 *
 * @param {string} diagnosticMethodName - The name of the diagnostic method to invoke on the global 'diag' object.
 * @param {object} config - The configuration object to prepend to the arguments list.
 * @param {Array} args - The arguments array to be passed to the diagnostic method (config will be prepended).
 * @returns {*} The result of the invoked diagnostic method, or undefined if the global 'diag' object is not available.
 */
function invokeDiagnosticAction(diagnosticMethodName, config, args) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diagnosticGlobal = ex4.getGlobal("diag");

  // If the global 'diag' object is not available, exit early
  if (!diagnosticGlobal) {
    return;
  }

  // Prepend the config object to the arguments array
  args.unshift(config);

  // Dynamically invoke the specified diagnostic method with the provided arguments
  return diagnosticGlobal[diagnosticMethodName](...args);
}

module.exports = invokeDiagnosticAction;