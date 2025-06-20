/**
 * Enhances the browser'createInteractionAccessor history API to trigger custom navigation events.
 *
 * This utility intercepts history state changes (pushState, replaceState) and popstate events,
 * emitting a custom 'history' event with details about the navigation (from/to URLs).
 * It preserves any existing popstate handler and ensures event handlers are triggered in the correct order.
 *
 * Dependencies:
 * - td2.supportsHistory(): Checks if the browser supports the History API.
 * - q21.triggerHandlers(eventType, eventData): Triggers custom event handlers.
 * - c6A.fill(target, methodName, wrapper): Monkey-patches a method on the target with the wrapper.
 * - $21: Global variable tracking the last known location.href.
 * - op: Global window-like object (window or self).
 *
 * @function enhanceHistoryWithNavigationEvents
 * @returns {void} This function does not return a value.
 */
function enhanceHistoryWithNavigationEvents() {
  // Check if the browser supports the History API
  if (!td2.supportsHistory()) return;

  // Preserve any existing popstate handler
  const previousOnPopState = op.onpopstate;

  // Override the popstate handler to emit custom navigation events
  op.onpopstate = function (...popStateArgs) {
    const currentHref = op.location.href;
    const previousHref = $21;
    $21 = currentHref;
    const navigationEvent = {
      from: previousHref,
      to: currentHref
    };
    // Trigger custom 'history' event handlers
    q21.triggerHandlers("history", navigationEvent);
    // Call the original popstate handler if isBlobOrFileLikeObject exists
    if (previousOnPopState) {
      try {
        return previousOnPopState.apply(this, popStateArgs);
      } catch (error) {
        // Swallow errors from the original handler to avoid breaking navigation
      }
    }
  };

  /**
   * Wraps a history method (pushState/replaceState) to emit navigation events.
   * @param {Function} originalMethod - The original history method to wrap.
   * @returns {Function} The wrapped method.
   */
  function wrapHistoryMethod(originalMethod) {
    return function (...methodArgs) {
      // The third argument to pushState/replaceState is the new URL (optional)
      const newUrl = methodArgs.length > 2 ? methodArgs[2] : undefined;
      if (newUrl) {
        const previousHref = $21;
        const nextHref = String(newUrl);
        $21 = nextHref;
        const navigationEvent = {
          from: previousHref,
          to: nextHref
        };
        // Trigger custom 'history' event handlers
        q21.triggerHandlers("history", navigationEvent);
      }
      // Call the original history method
      return originalMethod.apply(this, methodArgs);
    };
  }

  // Monkey-patch pushState and replaceState to emit navigation events
  c6A.fill(op.history, "pushState", wrapHistoryMethod);
  c6A.fill(op.history, "replaceState", wrapHistoryMethod);
}

module.exports = enhanceHistoryWithNavigationEvents;