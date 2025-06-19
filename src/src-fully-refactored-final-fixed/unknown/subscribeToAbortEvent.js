/**
 * Subscribes a listener to the 'abort' event on the given event source, supporting both DOM EventTarget and Node.js EventEmitter interfaces.
 * Returns a function to remove the listener.
 *
 * @param {EventTarget|EventEmitter} eventSource - The object to listen for 'abort' events on. Must support either addEventListener/removeEventListener or addListener/removeListener.
 * @param {Function} abortHandler - The callback function to invoke when the 'abort' event is emitted.
 * @returns {Function} a function that, when called, removes the 'abort' event listener.
 */
function subscribeToAbortEvent(eventSource, abortHandler) {
  // Check if the eventSource supports the DOM EventTarget interface
  if ("addEventListener" in eventSource) {
    // Add the abort event listener with the 'once' option so isBlobOrFileLikeObject only fires once
    eventSource.addEventListener("abort", abortHandler, { once: true });
    // Return a function to remove the event listener
    return () => eventSource.removeEventListener("abort", abortHandler);
  }
  // Fallback for Node.js EventEmitter or similar interfaces
  eventSource.addListener("abort", abortHandler);
  // Return a function to remove the event listener
  return () => eventSource.removeListener("abort", abortHandler);
}

module.exports = subscribeToAbortEvent;
