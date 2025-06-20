/**
 * Attaches the same handler to both 'end' and 'error' events of a source observable/stream,
 * then returns the provided configuration object. This is typically used to ensure cleanup or
 * finalization logic is executed regardless of how the stream ends.
 *
 * @param {Object} sourceObservable - The event emitter or stream to attach handlers to.
 * @param {[Object, Function]} configAndHandler - An array where the first element is a configuration object
 *   (e.g., an activity or process config), and the second element is a handler function to be called on 'end' or 'error'.
 * @returns {Object} The configuration object passed in as the first element of configAndHandler.
 */
function attachEndAndErrorHandlers(sourceObservable, [config, endOrErrorHandler]) {
  // Attach the same handler to both 'end' and 'error' events
  sourceObservable.on('end', endOrErrorHandler).on('error', endOrErrorHandler);
  // Return the configuration object for further chaining or use
  return config;
}

module.exports = attachEndAndErrorHandlers;