/**
 * Executes the processPendingFiberNodes function with the provided input and options, always passing 'false' as the second argument.
 *
 * @param {any} input - The primary input to be processed by the processPendingFiberNodes function.
 * @param {any} options - Additional options or configuration to be passed to the processPendingFiberNodes function.
 * @returns {any} The result returned by the processPendingFiberNodes function.
 */
function executeIqWithoutFlag(input, options) {
  // Always call processPendingFiberNodes with the second argument set to false
  return processPendingFiberNodes(input, false, options);
}

module.exports = executeIqWithoutFlag;