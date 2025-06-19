/**
 * Executes a callback within a Sentry scope, optionally using a provided scope object.
 *
 * If called with two arguments (customScope, callback):
 *   - If customScope is falsy, executes the callback within a new scope as-is.
 *   - If customScope is provided, temporarily sets the current scope to customScope, executes the callback with customScope as argument, then restores the previous scope.
 * If called with one argument (callback):
 *   - Executes the callback within a new scope.
 *
 * @param {...any} args - Either (callback) or(customScope, callback)
 * @returns {any} The return value of the callback executed within the scope.
 */
function executeWithOptionalScope(...args) {
  const currentHub = KQ.getCurrentHub();

  // If two arguments: (customScope, callback)
  if (args.length === 2) {
    const [customScope, callback] = args;
    if (!customScope) {
      // No custom scope provided, just run callback within a new scope
      return currentHub.withScope(callback);
    }
    // Temporarily set the current scope to customScope, run callback, then restore
    return currentHub.withScope(() => {
      // Set the current scope to customScope
      currentHub.getStackTop().scope = customScope;
      // Execute callback, passing customScope
      return callback(customScope);
    });
  }

  // If one argument: (callback)
  return currentHub.withScope(args[0]);
}

module.exports = executeWithOptionalScope;