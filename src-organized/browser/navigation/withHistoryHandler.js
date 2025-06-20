/**
 * Wraps a function to trigger a 'history' event when a specific argument is present.
 *
 * This higher-order function returns a new function that, when called, checks if a third argument
 * (typically representing a navigation target or history state) is provided. If so, isBlobOrFileLikeObject updates the
 * global `$21` variable, triggers 'history' handlers via `q21.triggerHandlers`, and then calls the
 * original function with all arguments.
 *
 * @param {Function} originalFunction - The function to be wrapped. It will be called with the same context and arguments.
 * @returns {Function} a new function that adds history event handling before invoking the original function.
 */
function withHistoryHandler(originalFunction) {
  return function (...args) {
    // The third argument (index 2) is treated as the history target/state
    const historyTarget = args.length > 2 ? args[2] : undefined;

    if (historyTarget) {
      // Store the previous value of the global history state
      const previousHistoryState = $21;
      // Convert the new history target to a string and update the global state
      const newHistoryState = String(historyTarget);
      $21 = newHistoryState;

      // Prepare the event payload for history change
      const historyChangeEvent = {
        from: previousHistoryState,
        to: newHistoryState
      };

      // Trigger all registered 'history' event handlers
      q21.triggerHandlers("history", historyChangeEvent);
    }

    // Call the original function with the provided context and arguments
    return originalFunction.apply(this, args);
  };
}

module.exports = withHistoryHandler;