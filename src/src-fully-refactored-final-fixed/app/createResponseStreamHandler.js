/**
 * Creates a response stream handler based on the provided subscription configuration.
 *
 * This function initializes a UI action click transaction and then returns an instance
 * of either a streaming or non-streaming response handler, depending on the subscription options.
 *
 * @param {Observable} sourceObservable - The source observable to process.
 * @param {Object} config - Additional configuration options for the handler.
 * @param {Object} subscription - Subscription options, including path and responseStream flag.
 * @param {string} subscription.path - The API path or endpoint for the request.
 * @param {boolean} [subscription.responseStream] - Whether to use a streaming response handler.
 * @returns {kP0|jP0} An instance of the appropriate response handler based on the subscription.
 */
function createResponseStreamHandler(sourceObservable, config, subscription) {
  // Start a UI action click transaction for Sentry monitoring
  const transaction = startUiActionClickTransaction(sourceObservable, subscription.path, config);

  // If responseStream is true, return a streaming response handler
  if (subscription.responseStream) {
    return new kP0(transaction, subscription);
  } else {
    // Otherwise, return a non-streaming response handler
    return new jP0(transaction, subscription);
  }
}

module.exports = createResponseStreamHandler;