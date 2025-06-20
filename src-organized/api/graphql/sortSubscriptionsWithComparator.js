/**
 * Sorts an array of subscription objects using a custom comparator.
 *
 * @param {Array<Object>} subscriptions - The array of subscription objects to sort.
 * @param {any} comparatorConfig - Configuration or context passed to the comparator function.
 * @returns {Array<Object>} The sorted array of subscription objects.
 */
const sortSubscriptionsWithComparator = (subscriptions, comparatorConfig) => {
  // Sort the subscriptions array using the external uM6 comparator function
  return subscriptions.sort((subscriptionA, subscriptionB) => {
    // uM6 is assumed to be an imported comparator function
    return uM6(subscriptionA, subscriptionB, comparatorConfig);
  });
};

module.exports = sortSubscriptionsWithComparator;