/**
 * Invokes a diagnostic method from the global 'diag' object, prepending a configuration object to the arguments array.
 *
 * @param {string} diagnosticMethodName - The name of the diagnostic method to invoke on the global 'diag' object.
 * @param {object} config - The configuration object to prepend to the arguments array.
 * @param {Array} args - The array of arguments to pass to the diagnostic method (will be mutated).
 * @returns {*} The result of the invoked diagnostic method, or undefined if the global 'diag' object is not available.
 */
function invokeGlobalDiagnosticWithPrependedConfig(diagnosticMethodName, config, args) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const globalDiag = ex4.getGlobal("diag");
  if (!globalDiag) {
    // If 'diag' is not available globally, exit early
    return;
  }
  // Prepend the config object to the arguments array
  args.unshift(config);
  // Dynamically invoke the specified diagnostic method with the modified arguments
  return globalDiag[diagnosticMethodName](...args);
}

module.exports = invokeGlobalDiagnosticWithPrependedConfig;