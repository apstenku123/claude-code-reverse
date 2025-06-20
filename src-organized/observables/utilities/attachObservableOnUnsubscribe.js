/**
 * Attaches a given observable to the subscription so that isBlobOrFileLikeObject is unsubscribed when the main subscription is unsubscribed.
 *
 * @param {Observable} sourceObservable - The observable to attach for unsubscription cleanup.
 * @returns {Function} An operator function to be used with H_9.operate.
 */
function attachObservableOnUnsubscribe(sourceObservable) {
  return H_9.operate(function (config, subscription) {
    try {
      // Subscribe to the main observable
      config.subscribe(subscription);
    } finally {
      // Ensure the sourceObservable is unsubscribed when the main subscription is unsubscribed
      subscription.add(sourceObservable);
    }
  });
}

module.exports = attachObservableOnUnsubscribe;