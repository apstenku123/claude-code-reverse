/**
 * Creates a new partial success response handler with logging capabilities.
 *
 * This function constructs and returns an instance of the pM0 handler, which is responsible for managing
 * partial success responses in an asynchronous transport system. It injects logging and timeout configuration
 * into the handler for robust error handling and observability.
 *
 * @param {Object} sourceObservable - The source observable containing transport, serializer, and promise handler.
 * @param {Object} config - Configuration object containing the timeout value.
 * @returns {Object} An instance of the partial success response handler (pM0).
 */
function createPartialSuccessResponseHandler(sourceObservable, config) {
  // Create a logging handler for partial success responses
  const loggingHandler = g16.createLoggingPartialSuccessResponseHandler();

  // Construct and return the partial success response handler
  return new pM0(
    sourceObservable.transport,           // Transport mechanism for communication
    sourceObservable.serializer,          // Serializer for request/response data
    loggingHandler,                       // Handler for logging partial successes
    sourceObservable.promiseHandler,      // Promise handler for async operations
    config.timeout                        // Timeout configuration for the handler
  );
}

module.exports = createPartialSuccessResponseHandler;
