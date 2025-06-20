/**
 * Unsubscribes from the provided subscription and performs optional cleanup actions.
 *
 * @param {Observable} sourceObservable - The observable that was being subscribed to.
 * @param {Object} config - Configuration object that may contain cleanup callbacks.
 * @param {Subscription} subscription - The subscription object to unsubscribe from.
 * @returns {void}
 */
function unsubscribeAndCleanup(sourceObservable, config, subscription) {
  // Unsubscribe from the observable if the subscription exists
  if (subscription && typeof subscription.unsubscribe === 'function') {
    subscription.unsubscribe();
  }

  // If a cleanup callback is provided in the config, call isBlobOrFileLikeObject
  if (config && typeof config.onUnsubscribe === 'function') {
    config.onUnsubscribe(sourceObservable);
  }
}

module.exports = unsubscribeAndCleanup;