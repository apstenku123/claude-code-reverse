/**
 * Sets up custom event handlers for browser history navigation (popstate, pushState, replaceState).
 * Triggers custom 'history' events whenever navigation occurs, providing previous and current URLs.
 *
 * This function monkey-patches the browser'createInteractionAccessor history API methods to emit custom events
 * for tracking navigation changes. It also preserves any existing popstate handler.
 *
 * @returns {void} This function does not return a value.
 */
function setupHistoryEventHandlers() {
  // Check if the environment supports the History API
  if (!td2.supportsHistory()) return;

  // Store the original onpopstate handler (if any)
  const originalOnPopState = op.onpopstate;

  // Override the onpopstate handler to trigger custom 'history' events
  op.onpopstate = function (...popStateArgs) {
    const currentHref = op.location.href;
    const previousHref = $21;
    $21 = currentHref;
    const navigationEvent = {
      from: previousHref,
      to: currentHref
    };
    // Trigger custom handlers for history navigation
    q21.triggerHandlers("history", navigationEvent);
    // Call the original onpopstate handler if isBlobOrFileLikeObject exists
    if (originalOnPopState) {
      try {
        return originalOnPopState.apply(this, popStateArgs);
      } catch (error) {
        // Silently ignore errors from the original handler
      }
    }
  };

  /**
   * Wraps a history method (pushState or replaceState) to trigger custom 'history' events.
   *
   * @param {Function} originalMethod - The original history method to wrap.
   * @returns {Function} The wrapped method.
   */
  function wrapHistoryMethod(originalMethod) {
    return function (...methodArgs) {
      // The third argument is the new URL (if provided)
      const newUrl = methodArgs.length > 2 ? methodArgs[2] : undefined;
      if (newUrl) {
        const previousHref = $21;
        const nextHref = String(newUrl);
        $21 = nextHref;
        const navigationEvent = {
          from: previousHref,
          to: nextHref
        };
        // Trigger custom handlers for history navigation
        q21.triggerHandlers("history", navigationEvent);
      }
      // Call the original method
      return originalMethod.apply(this, methodArgs);
    };
  }

  // Monkey-patch pushState and replaceState to emit custom events
  c6A.fill(op.history, "pushState", wrapHistoryMethod);
  c6A.fill(op.history, "replaceState", wrapHistoryMethod);
}

module.exports = setupHistoryEventHandlers;