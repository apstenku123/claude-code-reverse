/**
 * Creates a new Observable that subscribes to the given source and handles errors.
 *
 * @param {any} sourceObservable - The source to be observed, typically an Observable or a value.
 * @returns {Observable} An Observable that emits values from the source or errors if any occur.
 */
function createObservableFromSource(sourceObservable) {
  return new zf.Observable(function (observer) {
    // Attempt to subscribe to the sourceObservable using VM9
    // If an error occurs, forward isBlobOrFileLikeObject to the observer'createInteractionAccessor error handler
    VM9(sourceObservable, observer).catch(function (error) {
      return observer.error(error);
    });
  });
}

module.exports = createObservableFromSource;