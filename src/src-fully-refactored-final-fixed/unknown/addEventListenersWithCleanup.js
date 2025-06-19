/**
 * Attaches multiple event listeners to an event emitter and returns a cleanup function to remove them.
 *
 * @param {Object} eventEmitter - The event emitter object supporting 'on' and 'removeListener' methods.
 * @param {Object} eventHandlers - An object mapping event names to handler functions.
 * @returns {Function} a cleanup function that removes all attached event listeners when called.
 */
function addEventListenersWithCleanup(eventEmitter, eventHandlers) {
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

module.exports = addEventListenersWithCleanup;