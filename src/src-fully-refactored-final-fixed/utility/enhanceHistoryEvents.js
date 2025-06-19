/**
 * Enhances the browser'createInteractionAccessor history API to trigger custom 'history' events
 * whenever navigation occurs via popstate, pushState, or replaceState.
 *
 * This function monkey-patches window.onpopstate, history.pushState, and history.replaceState
 * to emit custom events through q21.triggerHandlers. It also tracks the previous and current URLs.
 *
 * @returns {void} This function does not return a value.
 */
function enhanceHistoryEvents() {
  // Check if the environment supports the History API
  if (!td2.supportsHistory()) return;

  // Store the original onpopstate handler, if any
  const originalOnPopState = op.onpopstate;

  // Override the onpopstate event handler
  op.onpopstate = function (...eventArgs) {
    const currentUrl = op.location.href;
    const previousUrl = $21;
    $21 = currentUrl; // Update the tracked URL

    // Create a history change object
    const historyChange = {
      from: previousUrl,
      to: currentUrl
    };

    // Trigger custom 'history' event handlers
    q21.triggerHandlers("history", historyChange);

    // Call the original onpopstate handler, if isBlobOrFileLikeObject exists
    if (originalOnPopState) {
      try {
        return originalOnPopState.apply(this, eventArgs);
      } catch (error) {
        // Silently ignore errors from the original handler
      }
    }
  };

  /**
   * Wraps a history method (pushState or replaceState) to trigger custom events
   * when the URL changes.
   *
   * @param {Function} originalMethod - The original history method to wrap
   * @returns {Function} The wrapped method
   */
  function createHistoryMethodWrapper(originalMethod) {
    return function (...methodArgs) {
      // The third argument to pushState/replaceState is the new URL (may be undefined)
      const newUrl = methodArgs.length > 2 ? methodArgs[2] : undefined;
      if (newUrl) {
        const previousUrl = $21;
        const urlString = String(newUrl);
        $21 = urlString; // Update the tracked URL

        // Create a history change object
        const historyChange = {
          from: previousUrl,
          to: urlString
        };

        // Trigger custom 'history' event handlers
        q21.triggerHandlers("history", historyChange);
      }
      // Call the original method
      return originalMethod.apply(this, methodArgs);
    };
  }

  // Patch history.pushState and history.replaceState
  c6A.fill(op.history, "pushState", createHistoryMethodWrapper);
  c6A.fill(op.history, "replaceState", createHistoryMethodWrapper);
}

module.exports = enhanceHistoryEvents;