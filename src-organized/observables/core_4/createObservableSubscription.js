/**
 * Creates a subscription to the provided observable and returns the subscription object.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @returns {Subscription} The subscription object for the observable.
 */
function createObservableSubscription(sourceObservable) {
  // Subscribe to the observable and return the subscription
  return sourceObservable.subscribe();
}

module.exports = createObservableSubscription;