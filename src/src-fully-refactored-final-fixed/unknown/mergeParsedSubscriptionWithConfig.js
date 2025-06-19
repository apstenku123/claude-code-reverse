/**
 * Merges a parsed subscription object from an observable source with additional configuration data.
 *
 * @async
 * @function mergeParsedSubscriptionWithConfig
 * @param {Object} sourceObservable - The observable source containing a 'body' property to be parsed.
 * @param {Object} config - Configuration object used for parsing and merging.
 * @returns {Promise<Object>} The merged subscription object containing data from both the parsed observable and the configuration.
 */
async function mergeParsedSubscriptionWithConfig(sourceObservable, config) {
  // Initialize an empty subscription object
  const subscription = {};

  // Parse the subscription from the observable'createInteractionAccessor body using the provided config
  const parsedSubscription = await parseSubscriptionFromObservable(sourceObservable.body, config);

  // Merge the parsed subscription data with the empty subscription object using additional logic from lr6
  // lr6 likely processes or transforms the parsed subscription with the config
  Object.assign(subscription, lr6(parsedSubscription, config));

  // Return the merged subscription object
  return subscription;
}

module.exports = mergeParsedSubscriptionWithConfig;