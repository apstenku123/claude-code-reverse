/**
 * Attaches a source observable to the subscription lifecycle of another observable.
 *
 * This utility wraps the H_9.operate method, subscribing to the provided config observable,
 * and ensures the sourceObservable is added to the subscription for proper teardown.
 *
 * @param {Observable} sourceObservable - The observable to attach to the subscription lifecycle.
 * @returns {Function} Operator function to be used with H_9.operate.
 */
function attachObservableOnSubscription(sourceObservable) {
  return H_9.operate(function (configObservable, subscription) {
    try {
      // Subscribe to the configObservable and tie its lifecycle to the subscription
      configObservable.subscribe(subscription);
    } finally {
      // Ensure the sourceObservable is added to the subscription for teardown
      subscription.add(sourceObservable);
    }
  });
}

module.exports = attachObservableOnSubscription;