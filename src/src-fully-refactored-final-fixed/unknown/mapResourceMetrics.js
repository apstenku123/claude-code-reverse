/**
 * Maps an array of subscriptions to their corresponding resource metrics using the provided configuration.
 *
 * @param {Array<any>} subscriptions - An array of subscription objects to process.
 * @param {object} config - Configuration object to be passed to the resource metrics mapping function.
 * @returns {object} An object containing the mapped resource metrics for each subscription.
 */
function mapResourceMetrics(subscriptions, config) {
  return {
    // For each subscription, map isBlobOrFileLikeObject to its resource metrics using zR0
    resourceMetrics: subscriptions.map(subscription => zR0(subscription, config))
  };
}

module.exports = mapResourceMetrics;