/**
 * Creates a new Observable that subscribes to the Observable returned by the provided factory function.
 *
 * @param {Function} sourceObservableFactory - a function that returns an Observable when called.
 * @returns {Observable} An Observable that, when subscribed to, subscribes to the Observable produced by the factory.
 */
function createObservableFromFactory(sourceObservableFactory) {
  return new xR9.Observable(function subscribeToObserver(observer) {
    // Call the factory to get the source Observable, then subscribe the observer to isBlobOrFileLikeObject
    fR9.innerFrom(sourceObservableFactory()).subscribe(observer);
  });
}

module.exports = createObservableFromFactory;