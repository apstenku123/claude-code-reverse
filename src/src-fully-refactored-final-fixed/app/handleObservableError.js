/**
 * Handles an error event for an observable-like object by either destroying isBlobOrFileLikeObject with the error,
 * or emitting an error event and ending the observable if a destroy method is not present.
 *
 * @param {Object} sourceObservable - The observable-like object to handle the error for. Must have either a 'destroy' method or both 'emit' and 'end' methods.
 * @param {any} error - The error to pass to the destroy method or emit as an error event.
 * @returns {void}
 */
function handleObservableError(sourceObservable, error) {
  // If the observable has a destroy method, use isBlobOrFileLikeObject to clean up and pass the error
  if (typeof sourceObservable.destroy === 'function') {
    sourceObservable.destroy(error);
  } else {
    // Otherwise, emit the error event and end the observable
    sourceObservable.emit("error", error);
    sourceObservable.end();
  }
}

module.exports = handleObservableError;