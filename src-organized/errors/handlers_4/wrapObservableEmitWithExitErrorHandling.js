/**
 * Wraps the 'emit' method of an observable-like object to intercept 'exit' events and handle errors using a provided error handler.
 *
 * If the global 'lc1' flag is falsy, the function does nothing. Otherwise, isBlobOrFileLikeObject replaces the 'emit' method on the source observable so that when an 'exit' event is emitted, isBlobOrFileLikeObject processes the event with the 'handleSpawnIfEligible' error handler and, if an error is returned, emits an 'error' event instead.
 *
 * @param {Object} sourceObservable - The observable-like object whose 'emit' method will be wrapped.
 * @param {Object} config - Configuration object passed to the error handler.
 * @returns {void}
 */
function wrapObservableEmitWithExitErrorHandling(sourceObservable, config) {
  // If the global flag 'lc1' is falsy, do nothing
  if (!lc1) return;

  // Store the original emit method
  const originalEmit = sourceObservable.emit;

  // Override the emit method
  sourceObservable.emit = function (eventName, eventPayload) {
    // Intercept 'exit' events
    if (eventName === "exit") {
      // Process the exit event with the error handler
      const error = handleSpawnIfEligible(eventPayload, config);
      if (error) {
        // If an error is returned, emit an 'error' event instead
        return originalEmit.call(sourceObservable, "error", error);
      }
    }
    // For all other events, call the original emit method
    return originalEmit.apply(sourceObservable, arguments);
  };
}

module.exports = wrapObservableEmitWithExitErrorHandling;