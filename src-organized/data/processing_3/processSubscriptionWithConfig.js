/**
 * Processes a subscription using the provided configuration and source observable.
 *
 * @param {Object} config - Configuration object for processing the subscription.
 * @param {Object} sourceObservable - The observable source to be processed.
 * @param {Object} subscription - The subscription object to be managed.
 * @returns {any} The result of processing the subscription with the given configuration and source observable.
 */
const processSubscriptionWithConfig = (config, sourceObservable, subscription) => {
  // Delegates the processing to the external bM6 function, swapping the order of config and sourceObservable
  return bM6(config, sourceObservable, subscription);
};

module.exports = processSubscriptionWithConfig;
