/**
 * Attaches multiple event listeners to an event emitter and returns a cleanup function to remove them.
 *
 * @param {Object} eventEmitter - The object that emits events (must support .on and .removeListener methods).
 * @param {Object} eventHandlers - An object mapping event names to their handler functions.
 * @returns {Function} Cleanup function that removes all attached event listeners when called.
 */
function attachEventListenersWithCleanup(eventEmitter, eventHandlers) {
  // Attach each handler to the corresponding event
  for (const eventName of Object.keys(eventHandlers)) {
    eventEmitter.on(eventName, eventHandlers[eventName]);
  }

  // Return a cleanup function to remove all attached listeners
  return function removeEventListeners() {
    for (const eventName of Object.keys(eventHandlers)) {
      eventEmitter.removeListener(eventName, eventHandlers[eventName]);
    }
  };
}

module.exports = attachEventListenersWithCleanup;