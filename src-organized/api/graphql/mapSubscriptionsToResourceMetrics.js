/**
 * Maps an array of subscriptions to their corresponding resource metrics using a provided configuration.
 *
 * @param {Array<Object>} subscriptions - An array of subscription objects to process.
 * @param {Object} config - Configuration object passed to the resource metric mapping function.
 * @returns {Object} An object containing the resource metrics for each subscription.
 */
function mapSubscriptionsToResourceMetrics(subscriptions, config) {
  return {
    // For each subscription, generate its resource metrics using zR0
    resourceMetrics: subscriptions.map(subscription => zR0(subscription, config))
  };
}

module.exports = mapSubscriptionsToResourceMetrics;