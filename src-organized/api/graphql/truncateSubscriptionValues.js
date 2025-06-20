/**
 * Truncates the 'value' property of each subscription in the provided array using the specified configuration.
 *
 * @param {Array<Object>} subscriptions - Array of subscription objects, each potentially containing a 'value' property.
 * @param {any} truncateConfig - Configuration or length parameter to be passed to Ch2.truncate for truncation.
 * @returns {Array<Object>} The updated array of subscriptions with truncated 'value' properties where applicable.
 */
function truncateSubscriptionValues(subscriptions, truncateConfig) {
  return subscriptions.map(subscription => {
    // Only truncate if the subscription has a 'value' property
    if (subscription.value) {
      subscription.value = Ch2.truncate(subscription.value, truncateConfig);
    }
    return subscription;
  });
}

module.exports = truncateSubscriptionValues;