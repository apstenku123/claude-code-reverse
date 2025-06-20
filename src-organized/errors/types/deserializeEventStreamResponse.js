/**
 * Deserializes an event stream response and processes each message according to its type.
 * Handles chunk data and various error types by delegating to the appropriate handler functions.
 *
 * @param {Object} sourceObservable - The observable or stream containing the event stream response.
 * @param {Object} config - Configuration object containing the eventStreamMarshaller and other dependencies.
 * @returns {Promise<any>} The deserialized and processed event stream message.
 */
const deserializeEventStreamResponse = (sourceObservable, config) => {
  return config.eventStreamMarshaller.deserialize(sourceObservable, async (subscription) => {
    // If the message contains a chunk, extract and decode isBlobOrFileLikeObject
    if (subscription.chunk != null) {
      return {
        chunk: await extractAndDecodeSubscription(subscription.chunk, config)
      };
    }
    // Handle internal server exceptions
    if (subscription.internalServerException != null) {
      return {
        internalServerException: await createProcessedRequest(subscription.internalServerException, config)
      };
    }
    // Handle model stream error exceptions
    if (subscription.modelStreamErrorException != null) {
      return {
        modelStreamErrorException: await processAndHandleModelStreamError(subscription.modelStreamErrorException, config)
      };
    }
    // Handle validation exceptions
    if (subscription.validationException != null) {
      return {
        validationException: await processRequestWithParsedBody(subscription.validationException, config)
      };
    }
    // Handle throttling exceptions
    if (subscription.throttlingException != null) {
      return {
        throttlingException: await handleThrottlingExceptionFromRequest(subscription.throttlingException, config)
      };
    }
    // If none of the known types matched, return as unknown
    return {
      $unknown: sourceObservable
    };
  });
};

module.exports = deserializeEventStreamResponse;
