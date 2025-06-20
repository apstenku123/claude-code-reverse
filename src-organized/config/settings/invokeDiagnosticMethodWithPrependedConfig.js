/**
 * Invokes a diagnostic method from the global 'diag' object, prepending a configuration object to the arguments array.
 *
 * @param {string} diagnosticMethodName - The name of the diagnostic method to invoke on the global 'diag' object.
 * @param {Object} config - The configuration object to prepend to the arguments array.
 * @param {Array} methodArguments - The array of arguments to pass to the diagnostic method (config will be prepended).
 * @returns {*} The result of the invoked diagnostic method, or undefined if the global 'diag' object is not available.
 */
function invokeDiagnosticMethodWithPrependedConfig(diagnosticMethodName, config, methodArguments) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diagnosticGlobal = ex4.getGlobal("diag");
  if (!diagnosticGlobal) {
    // If the global 'diag' object is not available, exit early
    return;
  }

  // Prepend the config object to the arguments array
  methodArguments.unshift(config);

  // Dynamically invoke the specified diagnostic method with the prepared arguments
  return diagnosticGlobal[diagnosticMethodName](...methodArguments);
}

module.exports = invokeDiagnosticMethodWithPrependedConfig;