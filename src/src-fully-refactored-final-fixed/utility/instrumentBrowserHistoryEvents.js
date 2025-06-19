/**
 * Instruments browser history events (popstate, pushState, replaceState) to trigger custom handlers.
 *
 * This utility function wraps the browser'createInteractionAccessor history API methods and the popstate event handler
 * to notify custom listeners (via q21.triggerHandlers) whenever navigation occurs.
 * It also preserves any existing popstate handler.
 *
 * Dependencies (must be available in the closure/scope):
 * - td2.supportsHistory(): Checks if the browser supports the History API.
 * - op: The global object (typically window).
 * - $21: a variable tracking the last known location.href.
 * - q21.triggerHandlers: Function to notify listeners of history changes.
 * - c6A.fill: Utility to wrap methods on an object.
 *
 * @returns {void} Does not return a value.
 */
function instrumentBrowserHistoryEvents() {
  // Exit early if the browser does not support the History API
  if (!td2.supportsHistory()) return;

  // Preserve any existing onpopstate handler
  const previousOnPopState = op.onpopstate;

  // Override the onpopstate handler to trigger custom history handlers
  op.onpopstate = function (...popStateArgs) {
    const currentHref = op.location.href;
    const previousHref = $21;
    $21 = currentHref;
    const navigationInfo = {
      from: previousHref,
      to: currentHref
    };
    // Notify listeners of the navigation event
    q21.triggerHandlers("history", navigationInfo);
    // Call the original onpopstate handler if isBlobOrFileLikeObject exists
    if (previousOnPopState) {
      try {
        return previousOnPopState.apply(this, popStateArgs);
      } catch (error) {
        // Swallow errors from the original handler to avoid breaking navigation
      }
    }
  };

  /**
   * Wraps a history method (pushState or replaceState) to trigger custom handlers on navigation.
   * @param {Function} originalMethod - The original history method to wrap.
   * @returns {Function} The wrapped method.
   */
  function wrapHistoryMethod(originalMethod) {
    return function (...methodArgs) {
      // The third argument to pushState/replaceState is the new URL (if provided)
      const newUrl = methodArgs.length > 2 ? methodArgs[2] : undefined;
      if (newUrl) {
        const previousHref = $21;
        const nextHref = String(newUrl);
        $21 = nextHref;
        const navigationInfo = {
          from: previousHref,
          to: nextHref
        };
        // Notify listeners of the navigation event
        q21.triggerHandlers("history", navigationInfo);
      }
      // Call the original method
      return originalMethod.apply(this, methodArgs);
    };
  }

  // Instrument pushState and replaceState methods on the history object
  c6A.fill(op.history, "pushState", wrapHistoryMethod);
  c6A.fill(op.history, "replaceState", wrapHistoryMethod);
}

module.exports = instrumentBrowserHistoryEvents;