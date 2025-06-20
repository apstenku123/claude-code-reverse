/**
 * Executes a callback within a Sentry scope, optionally using a provided scope object.
 *
 * If called with two arguments, the first is an optional scope object and the second is a callback.
 * If the scope object is falsy, the callback is executed within a new scope as-is.
 * If the scope object is provided, isBlobOrFileLikeObject is set as the current scope before executing the callback.
 * If called with one argument, isBlobOrFileLikeObject is treated as a callback to execute within a new scope.
 *
 * @param {...any} args - Either (scope, callback) or(callback)
 * @returns {any} The result of the callback executed within the Sentry scope.
 */
function withOptionalScope(...args) {
  const currentHub = KQ.getCurrentHub();

  // If two arguments: (scope, callback)
  if (args.length === 2) {
    const [providedScope, callback] = args;
    if (!providedScope) {
      // No scope provided, just run callback within a new scope
      return currentHub.withScope(callback);
    }
    // Set the provided scope as the current scope, then run callback
    return currentHub.withScope(() => {
      currentHub.getStackTop().scope = providedScope;
      return callback(providedScope);
    });
  }

  // If one argument: (callback)
  return currentHub.withScope(args[0]);
}

module.exports = withOptionalScope;