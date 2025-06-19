/**
 * Sets up listeners to track browser history changes (popstate, pushState, replaceState) and triggers custom handlers.
 *
 * This function intercepts browser navigation events (back/forward, pushState, replaceState),
 * tracks the previous and current URLs, and notifies registered handlers via q21.triggerHandlers.
 * It also preserves any existing onpopstate handler.
 *
 * Dependencies (must be available in the scope):
 * - td2.supportsHistory(): Checks if the browser supports the History API.
 * - op: The global object (typically window).
 * - $21: a global variable holding the last known URL (string).
 * - q21.triggerHandlers: Function to notify listeners of history changes.
 * - c6A.fill: Utility to wrap methods (monkey-patch) on an object.
 *
 * @returns {void} Does not return a value.
 */
function setupHistoryChangeListeners() {
  // Exit if the browser does not support the History API
  if (!td2.supportsHistory()) return;

  // Save any existing onpopstate handler
  const previousOnPopState = op.onpopstate;

  // Override the onpopstate event to track navigation changes
  op.onpopstate = function (...eventArgs) {
    const currentUrl = op.location.href;
    const previousUrl = $21;
    $21 = currentUrl;
    const navigationInfo = {
      from: previousUrl,
      to: currentUrl
    };
    // Notify custom handlers about the navigation event
    q21.triggerHandlers("history", navigationInfo);
    // Call the original onpopstate handler if isBlobOrFileLikeObject exists
    if (previousOnPopState) {
      try {
        return previousOnPopState.apply(this, eventArgs);
      } catch (error) {
        // Silently ignore errors from the original handler
      }
    }
  };

  /**
   * Wraps a History API method (pushState or replaceState) to track navigation changes.
   *
   * @param {Function} originalMethod - The original history method to wrap.
   * @returns {Function} The wrapped method.
   */
  function createHistoryMethodWrapper(originalMethod) {
    return function (...methodArgs) {
      // The third argument to pushState/replaceState is the new URL (may be undefined)
      const newUrl = methodArgs.length > 2 ? methodArgs[2] : undefined;
      if (newUrl) {
        const previousUrl = $21;
        const nextUrl = String(newUrl);
        $21 = nextUrl;
        const navigationInfo = {
          from: previousUrl,
          to: nextUrl
        };
        // Notify custom handlers about the navigation event
        q21.triggerHandlers("history", navigationInfo);
      }
      // Call the original method
      return originalMethod.apply(this, methodArgs);
    };
  }

  // Wrap pushState and replaceState to intercept navigation changes
  c6A.fill(op.history, "pushState", createHistoryMethodWrapper);
  c6A.fill(op.history, "replaceState", createHistoryMethodWrapper);
}

module.exports = setupHistoryChangeListeners;