/**
 * Creates a new Observable that subscribes to the provided source Observable.
 *
 * @param {Object} sourceObservable - The source Observable to subscribe to. Must have a subscribe method.
 * @returns {Object} a new Observable that, when subscribed to, subscribes to the source Observable.
 */
function wrapObservableSubscription(sourceObservable) {
  // Create a new Observable that proxies subscriptions to the sourceObservable
  return new dP9.Observable(function subscribeToSource(subscriber) {
    // When the new Observable is subscribed to, subscribe to the sourceObservable
    return sourceObservable.subscribe(subscriber);
  });
}

module.exports = wrapObservableSubscription;