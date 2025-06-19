/**
 * Creates a callback wrapper that defers execution of the provided callback until after the next event loop tick.
 * On the first invocation, the callback is scheduled asynchronously using iWA. Subsequent invocations call the callback immediately.
 *
 * @param {Function} callback - The function to be executed, either deferred or immediately.
 * @returns {Function} a function that, when called, will execute the callback with provided arguments, either deferred (first call) or immediately (subsequent calls).
 */
function createDeferredCallback(callback) {
  let hasDeferred = false;

  // Schedule a function to set hasDeferred to true after the current event loop
  iWA(function () {
    hasDeferred = true;
  });

  /**
   * Executes the callback, deferring on the first call, immediately thereafter.
   * @param {...any} args - Arguments to pass to the callback.
   */
  return function deferredCallback(...args) {
    if (hasDeferred) {
      // If the event loop has passed, call immediately
      callback(...args);
    } else {
      // Otherwise, defer the callback execution
      iWA(function () {
        callback(...args);
      });
    }
  };
}

module.exports = createDeferredCallback;