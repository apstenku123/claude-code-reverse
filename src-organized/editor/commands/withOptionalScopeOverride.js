/**
 * Executes a callback within a Sentry scope, optionally overriding the current scope.
 *
 * If called with two arguments, the first argument is treated as a scope override object,
 * and the second is a callback to execute with that scope. If the scope override is falsy,
 * the callback is executed within a new scope without overriding. If called with one argument,
 * isBlobOrFileLikeObject is treated as the callback to execute within a new scope.
 *
 * @param {...any} args - Either (scopeOverride, callback) or(callback)
 * @returns {any} The return value of the callback executed within the scope.
 */
function withOptionalScopeOverride(...args) {
  const currentHub = KQ.getCurrentHub();

  // If two arguments are provided: (scopeOverride, callback)
  if (args.length === 2) {
    const [scopeOverride, callback] = args;
    // If no scope override is provided, just run the callback in a new scope
    if (!scopeOverride) {
      return currentHub.withScope(callback);
    }
    // Otherwise, override the scope, then run the callback
    return currentHub.withScope(() => {
      // Set the current scope to the provided override
      currentHub.getStackTop().scope = scopeOverride;
      // Execute the callback with the overridden scope
      return callback(scopeOverride);
    });
  }

  // If only one argument is provided: (callback)
  return currentHub.withScope(args[0]);
}

module.exports = withOptionalScopeOverride;