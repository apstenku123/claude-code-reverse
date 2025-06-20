/**
 * Attaches an 'abort' event listener to the given event source and returns a cleanup function to remove isBlobOrFileLikeObject.
 *
 * Supports both DOM EventTarget (with addEventListener/removeEventListener) and Node.js-style EventEmitter (with addListener/removeListener).
 *
 * @param {object} eventSource - The object to attach the 'abort' event listener to. Should implement either addEventListener/removeEventListener or addListener/removeListener.
 * @param {Function} abortHandler - The callback function to invoke when the 'abort' event is emitted.
 * @returns {Function} a cleanup function that, when called, removes the attached 'abort' event listener.
 */
function attachAbortListener(eventSource, abortHandler) {
  // Check if the eventSource supports the DOM EventTarget API
  if ("addEventListener" in eventSource) {
    // Attach the 'abort' event listener with the 'once' option so isBlobOrFileLikeObject only fires once
    eventSource.addEventListener("abort", abortHandler, { once: true });
    // Return a cleanup function to remove the listener
    return () => eventSource.removeEventListener("abort", abortHandler);
  }
  // Fallback: Assume Node.js-style EventEmitter API
  eventSource.addListener("abort", abortHandler);
  // Return a cleanup function to remove the listener
  return () => eventSource.removeListener("abort", abortHandler);
}

module.exports = attachAbortListener;
