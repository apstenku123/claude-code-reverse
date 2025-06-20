/**
 * Creates a transport handler with partial success logging and timeout configuration.
 *
 * @param {Object} sourceObservable - The source observable containing transport, serializer, and promise handler.
 * @param {Object} config - Configuration object containing the timeout value.
 * @returns {Object} An instance of the transport handler with logging and timeout applied.
 */
function createPartialSuccessTransportHandler(sourceObservable, config) {
  // Create a logging handler for partial success responses
  const loggingHandler = g16.createLoggingPartialSuccessResponseHandler();

  // Instantiate the transport handler with the provided dependencies and timeout
  return new pM0(
    sourceObservable.transport, // Handles the transport mechanism
    sourceObservable.serializer, // Serializes and deserializes messages
    loggingHandler, // Handles logging for partial successes
    sourceObservable.promiseHandler, // Manages promise resolution/rejection
    config.timeout // Timeout configuration for the handler
  );
}

module.exports = createPartialSuccessTransportHandler;
