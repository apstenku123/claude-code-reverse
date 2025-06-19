/**
 * Creates and decorates a ThrottlingException from a subscription observable and configuration.
 *
 * This function takes a source observable and a configuration object, parses the subscription body from the observable,
 * merges isBlobOrFileLikeObject into a new subscription object, and then creates a decorated ThrottlingException using that subscription and config.
 *
 * @param {Object} sourceObservable - The observable source containing the original request data.
 * @param {Object} config - Configuration options used for parsing and exception creation.
 * @returns {Promise<Object>} The decorated ThrottlingException object.
 */
async function createThrottlingExceptionFromSubscription(sourceObservable, config) {
  // Parse the subscription body from the observable using the provided config
  const parsedBody = await parseSubscriptionFromObservable(sourceObservable.body, config);

  // Create a new subscription object by merging the original observable with the parsed body
  const subscription = {
    ...sourceObservable,
    body: parsedBody
  };

  // Create and decorate the ThrottlingException using the subscription and config
  return createAndDecorateThrottlingException(subscription, config);
}

module.exports = createThrottlingExceptionFromSubscription;