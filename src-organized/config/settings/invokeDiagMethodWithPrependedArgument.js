/**
 * Invokes a method on the global 'diag' object, prepending a configuration argument to the method'createInteractionAccessor arguments array.
 *
 * @param {string} methodName - The name of the method to invoke on the 'diag' object.
 * @param {*} configArgument - The argument to prepend to the arguments array before invoking the method.
 * @param {Array} methodArguments - The array of arguments to pass to the method (will be mutated by prepending configArgument).
 * @returns {*} The result of the invoked method, or undefined if 'diag' is not available.
 */
function invokeDiagMethodWithPrependedArgument(methodName, configArgument, methodArguments) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diagGlobal = ex4.getGlobal("diag");
  if (!diagGlobal) {
    // If 'diag' is not available, exit early
    return;
  }
  // Prepend the configuration argument to the arguments array
  methodArguments.unshift(configArgument);
  // Dynamically invoke the specified method on 'diag' with the prepared arguments
  return diagGlobal[methodName](...methodArguments);
}

module.exports = invokeDiagMethodWithPrependedArgument;