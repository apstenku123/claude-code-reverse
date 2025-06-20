/**
 * Filters a subscription object by the keys present in the configuration object derived from the source observable.
 *
 * @param {any} sourceObservable - The source observable or object to extract configuration and subscription from.
 * @returns {any} The result of filtering the subscription using the configuration keys.
 */
function filterSubscriptionByConfigKeys(sourceObservable) {
  // Extract configuration object from the source observable
  const config = wz2(sourceObservable);
  // Obtain the subscription or related object from the source observable
  const subscription = AG5(sourceObservable);
  // Get all keys from the configuration object and create a Set for efficient lookup
  const configKeysSet = new Set(Object.keys(config));
  // Filter the subscription using the set of configuration keys
  return ma0(subscription, configKeysSet);
}

module.exports = filterSubscriptionByConfigKeys;