/**
 * Deserializes an event stream subscription, handling various possible message types.
 *
 * This function uses the provided eventStreamMarshaller to deserialize the source observable.
 * For each subscription message, isBlobOrFileLikeObject checks for known properties (chunk, internalServerException, modelStreamErrorException,
 * validationException, throttlingException) and processes them with the appropriate handler. If none match, isBlobOrFileLikeObject returns an
 * object with the original observable under the $unknown key.
 *
 * @param {Object} sourceObservable - The observable or event stream to be deserialized.
 * @param {Object} config - Configuration object containing the eventStreamMarshaller and handler functions.
 * @returns {Promise<any>} The deserialized and processed subscription message.
 */
const deserializeEventStreamSubscription = (sourceObservable, config) => {
  return config.eventStreamMarshaller.deserialize(sourceObservable, async (subscription) => {
    // Handle a valid chunk in the subscription
    if (subscription.chunk != null) {
      return {
        chunk: await createSubscriptionFromObservable(subscription.chunk, config)
      };
    }
    // Handle an internal server exception
    if (subscription.internalServerException != null) {
      return {
        internalServerException: await createProcessedRequest(subscription.internalServerException, config)
      };
    }
    // Handle a model stream error exception
    if (subscription.modelStreamErrorException != null) {
      return {
        modelStreamErrorException: await processAndHandleModelStreamError(subscription.modelStreamErrorException, config)
      };
    }
    // Handle a validation exception
    if (subscription.validationException != null) {
      return {
        validationException: await createProcessedSubscription(subscription.validationException, config)
      };
    }
    // Handle a throttling exception
    if (subscription.throttlingException != null) {
      return {
        throttlingException: await handleThrottlingExceptionFromRequest(subscription.throttlingException, config)
      };
    }
    // If none of the known properties are present, return the original observable as unknown
    return {
      $unknown: sourceObservable
    };
  });
};

module.exports = deserializeEventStreamSubscription;
