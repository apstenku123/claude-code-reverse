/**
 * Sorts an array of subscription objects using a custom comparator function.
 *
 * @param {Array<Object>} subscriptions - The array of subscription objects to sort.
 * @param {Object} config - Configuration object passed to the comparator function.
 * @returns {Array<Object>} The sorted array of subscriptions.
 */
function sortSubscriptionsByConfig(subscriptions, config) {
  // Sort the subscriptions array using the custom comparator 'uM6', passing the config
  return subscriptions.sort((subscriptionA, subscriptionB) => uM6(subscriptionA, subscriptionB, config));
}

module.exports = sortSubscriptionsByConfig;