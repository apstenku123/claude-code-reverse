/**
 * Merges properties from a subscription object into a specific configuration object within a source observable.
 *
 * @param {Object} sourceObservable - The main object containing various configurations.
 * @param {string} configKey - The key identifying the configuration object to update within sourceObservable.
 * @param {Object} subscription - An object containing properties to merge into the specified configuration.
 * @returns {void}
 */
function mergeSubscriptionIntoConfig(sourceObservable, configKey, subscription) {
  // Only proceed if subscription is a non-empty object
  if (subscription && Object.keys(subscription).length > 0) {
    // Clone the existing config object to avoid mutating the original
    sourceObservable[configKey] = {
      ...sourceObservable[configKey]
    };
    // Merge each property from subscription into the config object
    for (const property in subscription) {
      if (Object.prototype.hasOwnProperty.call(subscription, property)) {
        sourceObservable[configKey][property] = subscription[property];
      }
    }
  }
}

module.exports = mergeSubscriptionIntoConfig;