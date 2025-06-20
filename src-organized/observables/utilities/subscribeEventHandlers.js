/**
 * Subscribes multiple event handlers to an event emitter and returns an unsubscribe function.
 *
 * @param {Object} eventEmitter - The event emitter object that supports 'on' and 'removeListener' methods.
 * @param {Object} eventHandlers - An object where keys are event names and values are handler functions.
 * @returns {Function} a function that, when called, unsubscribes all the handlers added by this function.
 */
function subscribeEventHandlers(eventEmitter, eventHandlers) {
  // Attach each handler to the corresponding event
  for (const eventName of Object.keys(eventHandlers)) {
    eventEmitter.on(eventName, eventHandlers[eventName]);
  }

  // Return an unsubscribe function
  return function unsubscribeHandlers() {
    // Remove each handler from the corresponding event
    for (const eventName of Object.keys(eventHandlers)) {
      eventEmitter.removeListener(eventName, eventHandlers[eventName]);
    }
  };
}

module.exports = subscribeEventHandlers;