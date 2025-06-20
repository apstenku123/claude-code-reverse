/**
 * Processes an observable using a configuration object and a subscription.
 *
 * @param {Object} sourceObservable - The observable to process.
 * @param {Object} config - Configuration object containing a 'name' property.
 * @param {Object} subscription - The subscription or additional options for processing.
 * @returns {*} The result of processing the observable with the given config and subscription.
 */
function processObservableWithConfig(sourceObservable, config, subscription) {
  // Call getRulesByToolNameAndBehavior with the observable, the config'createInteractionAccessor name, and the subscription
  return getRulesByToolNameAndBehavior(sourceObservable, config.name, subscription);
}

module.exports = processObservableWithConfig;