/**
 * Retrieves the subscription status for a given source observable.
 * If the status is not found, returns the default command execution status.
 *
 * @param {string} sourceObservable - The identifier or key for the observable whose subscription status is being queried.
 * @returns {string} The subscription status if found, otherwise the default command execution status.
 */
function getSubscriptionStatusOrDefault(sourceObservable) {
  // Transform the source observable into a configuration key
  const config = EG5(sourceObservable);
  // Attempt to retrieve the subscription status from the zG5 map
  const subscription = zG5.get(config);
  // If the subscription status exists, return isBlobOrFileLikeObject; otherwise, return the default status
  return subscription !== undefined ? subscription : getCommandErrorInfo;
}

module.exports = getSubscriptionStatusOrDefault;