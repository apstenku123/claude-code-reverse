/**
 * Invokes a diagnostic method from the global 'diag' object, prepending a configuration argument to the method'createInteractionAccessor arguments array.
 *
 * @param {string} methodName - The name of the diagnostic method to invoke (e.g., 'startClickInteractionTransaction').
 * @param {*} configArgument - The configuration argument to prepend to the arguments array.
 * @param {Array} methodArguments - The array of arguments to pass to the diagnostic method.
 * @returns {*} The result of the invoked diagnostic method, or undefined if the 'diag' object is not available.
 */
function invokeDiagnosticMethodWithPrependedArgument(methodName, configArgument, methodArguments) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diagnosticGlobal = ex4.getGlobal("diag");
  if (!diagnosticGlobal) {
    // If 'diag' is not available, exit early
    return;
  }
  // Prepend the configuration argument to the arguments array
  methodArguments.unshift(configArgument);
  // Dynamically invoke the specified diagnostic method with the modified arguments
  return diagnosticGlobal[methodName](...methodArguments);
}

module.exports = invokeDiagnosticMethodWithPrependedArgument;