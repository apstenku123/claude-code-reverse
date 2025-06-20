/**
 * Creates a locked subscription to a source observable using a provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration object for the subscription.
 * @returns {any} The result of subscribing to the locked observable.
 */
function createLockedSubscription(sourceObservable, config) {
  // Transform the config using OT1 (assumed to prepare config for lock)
  const transformedConfig = OT1(config);
  // Create a locked observable using N81 with the lock method and transformed config
  const lockedObservable = N81(qv.lock)(sourceObservable, transformedConfig);
  // Subscribe to the locked observable and return the result
  return N81(lockedObservable);
}

module.exports = createLockedSubscription;