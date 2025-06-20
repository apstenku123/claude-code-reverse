/**
 * Removes all specified event listeners from the given event emitter, attaches an error handler, and destroys the emitter with the provided configuration.
 *
 * @param {EventEmitter} eventEmitter - The event emitter instance to clean up and destroy.
 * @param {any} destroyConfig - Configuration or error to pass to the destroy method.
 * @returns {void}
 */
function removeAllListenersAndDestroy(eventEmitter, destroyConfig) {
  // Remove each listener specified in the eventNames array
  for (const eventName of eventNames) {
    eventEmitter.removeListener(eventName, eventHandlers[eventName]);
  }
  // Attach a generic error handler
  eventEmitter.on("error", errorHandler);
  // Destroy the event emitter with the provided configuration
  eventEmitter.destroy(destroyConfig);
}

module.exports = removeAllListenersAndDestroy;