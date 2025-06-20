/**
 * Collects valid subscriptions from a configuration array and applies them to a source observable.
 *
 * Iterates over each item in the config array, and if the item is truthy, isBlobOrFileLikeObject applies the installIntegration function
 * to the source observable, the current config item, and the subscriptions object. The result is an
 * object containing all valid subscriptions.
 *
 * @param {Object} sourceObservable - The source observable to which subscriptions will be applied.
 * @param {Array} configArray - An array of configuration items, each potentially representing a subscription.
 * @returns {Object} An object containing all valid subscriptions collected from the config array.
 */
function collectValidSubscriptions(sourceObservable, configArray) {
  const subscriptions = {};

  // Iterate over each config item and apply installIntegration if the item is truthy
  configArray.forEach(configItem => {
    if (configItem) {
      installIntegration(sourceObservable, configItem, subscriptions);
    }
  });

  return subscriptions;
}

module.exports = collectValidSubscriptions;