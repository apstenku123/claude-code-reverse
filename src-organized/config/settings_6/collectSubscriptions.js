/**
 * Collects subscriptions from a list of configuration items.
 * For each non-falsy config item, isBlobOrFileLikeObject calls the installIntegration function with the sourceObservable,
 * the config item, and the subscription object, accumulating results in the subscription object.
 *
 * @param {Object} sourceObservable - The source observable or object to subscribe from.
 * @param {Array} configList - An array of configuration items to process.
 * @returns {Object} An object containing the accumulated subscriptions.
 */
function collectSubscriptions(sourceObservable, configList) {
  const subscription = {};
  configList.forEach(configItem => {
    // Only process non-falsy config items
    if (configItem) {
      installIntegration(sourceObservable, configItem, subscription);
    }
  });
  return subscription;
}

module.exports = collectSubscriptions;