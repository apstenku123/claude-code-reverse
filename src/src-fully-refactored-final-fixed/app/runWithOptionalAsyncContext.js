/**
 * Executes the provided function, optionally within a Sentry async context if available.
 *
 * If the current environment (subscription) has Sentry'createInteractionAccessor async context support, the function
 * is executed within that context using the provided configuration. Otherwise, the function
 * is executed directly.
 *
 * @param {Function} callback - The function to execute, typically processing interaction entries.
 * @param {Object} [options={}] - Optional configuration to pass to the async context runner.
 * @returns {any} The result of executing the callback, either within the async context or directly.
 */
function runWithOptionalAsyncContext(callback, options = {}) {
  // Retrieve the current subscription/environment
  const subscription = eT();

  // If Sentry async context is available, run the callback within that context
  if (subscription.__SENTRY__ && subscription.__SENTRY__.acs) {
    return subscription.__SENTRY__.acs.runWithAsyncContext(callback, options);
  }

  // Otherwise, execute the callback directly
  return callback();
}

module.exports = runWithOptionalAsyncContext;