/**
 * Creates a ModelStreamErrorException from a subscription observable and configuration.
 *
 * This utility function takes a source observable and a configuration object, parses the subscription
 * from the observable'createInteractionAccessor body, and then constructs a ModelStreamErrorException using the parsed data
 * and the configuration. This is useful for error handling in model streaming scenarios.
 *
 * @async
 * @param {Object} sourceObservable - The observable source containing the body to be parsed.
 * @param {Object} config - The configuration object used for parsing and error construction.
 * @returns {Promise<Object>} The constructed ModelStreamErrorException object.
 */
async function createModelStreamErrorFromSubscription(sourceObservable, config) {
  // Parse the subscription body from the observable using the provided configuration
  const subscription = {
    ...sourceObservable,
    body: await parseSubscriptionFromObservable(sourceObservable.body, config)
  };

  // Construct and return the ModelStreamErrorException using the parsed subscription and config
  return createModelStreamErrorException(subscription, config);
}

module.exports = createModelStreamErrorFromSubscription;