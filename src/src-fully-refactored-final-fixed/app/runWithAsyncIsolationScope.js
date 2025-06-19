/**
 * Executes the provided callback function within an asynchronous context that is isolated by the current isolation scope.
 * This ensures that any asynchronous operations within the callback are properly scoped and isolated.
 *
 * @param {Function} callback - a function to execute, which receives the current isolation scope as its argument.
 * @returns {*} The result of invoking the callback with the current isolation scope, possibly wrapped in an asynchronous context.
 */
function runWithAsyncIsolationScope(callback) {
  // Run the provided callback within an asynchronous context
  return KQ.runWithAsyncContext(() => {
    // Pass the current isolation scope to the callback
    return callback(KQ.getIsolationScope());
  });
}

module.exports = runWithAsyncIsolationScope;