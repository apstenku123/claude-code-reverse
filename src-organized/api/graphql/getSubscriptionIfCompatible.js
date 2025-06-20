/**
 * Retrieves a subscription from the global _a[Sa] object if its version is compatible.
 *
 * @param {string} subscriptionKey - The key to access the desired subscription from the global object.
 * @returns {any|undefined} The subscription object if the version is compatible; otherwise, undefined.
 */
function getSubscriptionIfCompatible(subscriptionKey) {
  // Retrieve the configuration object from the global _a[Sa] object
  const config = _a[Sa];

  // Safely extract the version property
  const version = config?.version;

  // If version is missing or not compatible, return undefined
  if (!version || !ix4.isCompatible(version)) {
    return;
  }

  // Retrieve and return the subscription by key if isBlobOrFileLikeObject exists
  const subscription = _a[Sa]?.[subscriptionKey];
  return subscription;
}

module.exports = getSubscriptionIfCompatible;