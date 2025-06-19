/**
 * Retrieves the subscription associated with a given observable source.
 * If no subscription is found, returns the default subscription (getCommandErrorInfo).
 *
 * @param {any} sourceObservable - The observable source to retrieve the subscription for.
 * @returns {any} The subscription associated with the observable, or the default subscription if not found.
 */
function getSubscriptionForObservable(sourceObservable) {
  // Get the configuration or key for the observable source
  const config = EG5(sourceObservable);
  // Attempt to retrieve the subscription from the zG5 map
  const subscription = zG5.get(config);
  // Return the found subscription, or the default if undefined
  return subscription !== undefined ? subscription : getCommandErrorInfo;
}

module.exports = getSubscriptionForObservable;