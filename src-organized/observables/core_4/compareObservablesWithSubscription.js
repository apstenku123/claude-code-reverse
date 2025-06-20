/**
 * Compares two observables using a given subscription configuration.
 *
 * @param {any} firstObservable - The first observable to compare.
 * @param {any} secondObservable - The second observable to compare.
 * @param {any} subscriptionConfig - The configuration or context for the subscription.
 * @returns {any} The result of comparing the two observables using the subscription configuration.
 */
function compareObservablesWithSubscription(firstObservable, secondObservable, subscriptionConfig) {
  // Create Us0 instances for both observables with the provided subscription configuration
  const firstUs0Instance = new Us0(firstObservable, subscriptionConfig);
  const secondUs0Instance = new Us0(secondObservable, subscriptionConfig);

  // Compare the two Us0 instances and return the result
  return firstUs0Instance.compare(secondUs0Instance);
}

module.exports = compareObservablesWithSubscription;