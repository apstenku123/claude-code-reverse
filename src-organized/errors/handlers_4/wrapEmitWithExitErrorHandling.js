/**
 * Wraps the 'emit' method of the given event emitter to intercept 'exit' events and handle errors using a custom error handler.
 *
 * @param {Object} eventEmitter - The event emitter whose 'emit' method will be wrapped.
 * @param {Object} errorHandlerConfig - Configuration or context passed to the error handler.
 * @returns {void}
 */
function wrapEmitWithExitErrorHandling(eventEmitter, errorHandlerConfig) {
  // Ensure the global flag 'lc1' is truthy before proceeding
  if (!lc1) return;

  // Store the original emit method
  const originalEmit = eventEmitter.emit;

  // Override the emit method
  eventEmitter.emit = function (eventName, eventData) {
    // Intercept 'exit' events
    if (eventName === "exit") {
      // Call the custom error handler with event data and config
      const error = handleSpawnIfEligible(eventData, errorHandlerConfig);
      if (error) {
        // If an error is returned, emit an 'error' event instead
        return originalEmit.call(eventEmitter, "error", error);
      }
    }
    // For all other events, call the original emit method
    return originalEmit.apply(eventEmitter, arguments);
  };
}

module.exports = wrapEmitWithExitErrorHandling;
