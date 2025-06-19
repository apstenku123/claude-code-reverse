/**
 * Retrieves the current isolation scope from the application context.
 *
 * This function calls the getCurrentSentryHub function (likely a context or dependency injector)
 * and returns the result of its getIsolationScope method, which provides the current
 * isolation scope for the application or component.
 *
 * @returns {any} The current isolation scope object or value.
 */
function getCurrentIsolationScope() {
  // Call the getCurrentSentryHub context provider and retrieve the isolation scope
  return getCurrentSentryHub().getIsolationScope();
}

module.exports = getCurrentIsolationScope;