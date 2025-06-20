/**
 * Subscribes a handler to an event source and returns an unsubscribe function.
 *
 * This function attaches the given event handler to the specified event source using processAndTransformInput.on,
 * and returns a function that, when called, detaches the handler using processAndTransformInput.off.
 *
 * @param {Object} eventSource - The object or element to which the event handler will be attached.
 * @param {Function} eventHandler - The function to be called when the event occurs.
 * @returns {Function} a function that removes the event handler from the event source when invoked.
 */
function subscribeWithAutoUnsubscribe(eventSource, eventHandler) {
  // Attach the event handler to the event source
  processAndTransformInput.on(eventSource, eventHandler);

  // Return a function that, when called, removes the event handler
  return function unsubscribe() {
    return processAndTransformInput.off(eventSource, eventHandler);
  };
}

module.exports = subscribeWithAutoUnsubscribe;