/**
 * Unsubscribes from an observable and performs cleanup actions.
 *
 * @param {Observable} sourceObservable - The observable to unsubscribe from.
 * @param {Object} config - Configuration object for cleanup options.
 * @param {Subscription} subscription - The subscription to be unsubscribed.
 * @returns {void}
 */
function unsubscribeAndCleanupObservable(sourceObservable, config, subscription) {
  // Unsubscribe from the observable if the subscription exists and is not already closed
  if (subscription && typeof subscription.unsubscribe === 'function' && !subscription.closed) {
    subscription.unsubscribe();
  }

  // Perform additional cleanup if specified in the config
  if (config && typeof config.onCleanup === 'function') {
    config.onCleanup(sourceObservable);
  }
}

module.exports = unsubscribeAndCleanupObservable;