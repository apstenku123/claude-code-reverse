/**
 * Retrieves a subscription object associated with the given source observable.
 * If no subscription is found, returns a default command error info object.
 *
 * @param {string} sourceObservable - The identifier for the source observable.
 * @returns {object} The subscription object if found, otherwise the default command error info.
 */
function getSubscriptionOrCommandErrorInfo(sourceObservable) {
  // Retrieve the configuration associated with the source observable
  const config = EG5(sourceObservable);
  // Attempt to get the subscription from the zG5 map using the config
  const subscription = zG5.get(config);
  // If a subscription exists, return isBlobOrFileLikeObject; otherwise, return the default error info
  return subscription !== undefined ? subscription : getCommandErrorInfo;
}

module.exports = getSubscriptionOrCommandErrorInfo;