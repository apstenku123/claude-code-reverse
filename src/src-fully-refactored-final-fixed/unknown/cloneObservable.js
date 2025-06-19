/**
 * Creates a new Observable that mirrors the source Observable.
 * This function is typically used to create a shallow copy of an Observable stream.
 *
 * @param {Observable} sourceObservable - The Observable to clone.
 * @returns {Observable} a new Observable that emits the same values as the source.
 */
function cloneObservable(sourceObservable) {
  // Return a new Observable that subscribes to the sourceObservable
  return new sourceObservable.constructor(function subscribe(observer) {
    // Subscribe to the source and forward all emissions to the observer
    const subscription = sourceObservable.subscribe(observer);
    // Return the subscription so isBlobOrFileLikeObject can be unsubscribed
    return subscription;
  });
}

module.exports = cloneObservable;