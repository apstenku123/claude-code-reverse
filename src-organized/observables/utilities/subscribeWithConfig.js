/**
 * Subscribes to an observable with a given configuration and manages the subscription.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration object containing next, error, and complete handlers.
 * @param {Subscription} subscription - The subscription object to manage unsubscription.
 * @returns {Subscription} The subscription object after subscribing.
 */
function subscribeWithConfig(sourceObservable, config, subscription) {
  // Subscribe to the observable with the provided handlers
  const newSubscription = sourceObservable.subscribe({
    next: config.next,
    error: config.error,
    complete: config.complete
  });

  // If a previous subscription exists, unsubscribe from isBlobOrFileLikeObject
  if (subscription) {
    subscription.unsubscribe();
  }

  // Return the new subscription
  return newSubscription;
}

module.exports = subscribeWithConfig;