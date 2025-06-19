/**
 * Emits an event of type 'createDebouncedFunction' using the provided observable source.
 *
 * @param {Observable} sourceObservable - The observable source to emit the event from.
 * @returns {any} The result of the createObservableResult event emission.
 */
function emitEventFromObservable(sourceObservable) {
  // Call the createObservableResult utility to emit an event of type 'createDebouncedFunction' with the given observable
  return createObservableResult("createDebouncedFunction", undefined, sourceObservable);
}

module.exports = emitEventFromObservable;