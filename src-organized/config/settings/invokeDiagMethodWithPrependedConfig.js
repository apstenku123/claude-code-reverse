/**
 * Invokes a method on the global 'diag' object, prepending a configuration object to the arguments.
 *
 * @param {string} methodName - The name of the method to invoke on the 'diag' object.
 * @param {*} config - The configuration object to prepend to the arguments list.
 * @param {Array} args - The array of arguments to pass to the method (config will be prepended).
 * @returns {*} The result of the invoked method, or undefined if 'diag' is not available.
 */
function invokeDiagMethodWithPrependedConfig(methodName, config, args) {
  // Retrieve the global 'diag' object using ex4.getGlobal
  const diag = ex4.getGlobal("diag");
  if (!diag) {
    // If 'diag' is not available, exit early
    return;
  }
  // Prepend the config object to the arguments array
  args.unshift(config);
  // Dynamically invoke the specified method on 'diag' with the provided arguments
  return diag[methodName](...args);
}

module.exports = invokeDiagMethodWithPrependedConfig;