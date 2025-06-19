/**
 * Emits an event of type "createDebouncedFunction" using the provided observable source.
 *
 * @param {Observable} sourceObservable - The observable source to emit with the event.
 * @returns {any} The result of the createObservableResult event emission.
 */
function emitEventWithObservable(sourceObservable) {
  // Call the external createObservableResult function with event type "createDebouncedFunction", undefined config, and the observable source
  return createObservableResult("createDebouncedFunction", undefined, sourceObservable);
}

module.exports = emitEventWithObservable;