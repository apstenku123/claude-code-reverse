/**
 * Checks if any subscription path derived from the given source observable exists on the filesystem.
 *
 * @param {any} sourceObservable - The source observable or configuration object to process.
 * @returns {boolean} True if any derived subscription path exists, false otherwise.
 */
function doesAnySubscriptionPathExist(sourceObservable) {
  // Get all subscription configurations from the source observable
  const subscriptionConfigs = findPluginDirectoriesForType(sourceObservable);

  for (const subscription of subscriptionConfigs) {
    // Join the subscription path using K3.join and xr0 as the separator
    const subscriptionPath = K3.join(subscription, xr0);
    // Check if the subscription path exists in the filesystem
    if (f1().existsSync(subscriptionPath)) {
      return true;
    }
  }
  // No subscription paths exist
  return false;
}

module.exports = doesAnySubscriptionPathExist;