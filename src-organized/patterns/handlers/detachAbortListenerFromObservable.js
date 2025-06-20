/**
 * Detaches the 'abort' event listener from the given observable'createInteractionAccessor handler and cleans up references.
 *
 * This function checks if the observable'createInteractionAccessor handler exists, removes the 'abort' event listener using the appropriate method
 * (depending on the handler'createInteractionAccessor API), and then nullifies both the handler and the abort callback references on the observable.
 *
 * @param {Object} observableWrapper - The object containing references to the event handler and abort callback.
 * @property {Object} observableWrapper.handler - The event handler object (may implement removeEventListener or removeListener).
 * @property {Function} observableWrapper.abortCallback - The callback function to be removed from the handler.
 * @returns {void}
 */
function detachAbortListenerFromObservable(observableWrapper) {
  // If there is no handler, nothing to do
  if (!observableWrapper.handler) return;

  // Remove the 'abort' event listener using the appropriate method
  if ("removeEventListener" in observableWrapper.handler) {
    observableWrapper.handler.removeEventListener("abort", observableWrapper.abortCallback);
  } else {
    observableWrapper.handler.removeListener("abort", observableWrapper.abortCallback);
  }

  // Clean up references to prevent memory leaks
  observableWrapper.handler = null;
  observableWrapper.abortCallback = null;
}

module.exports = detachAbortListenerFromObservable;