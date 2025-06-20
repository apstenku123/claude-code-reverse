/**
 * Extracts error information from the result of invoking an observable handler.
 *
 * @param {Function} observableHandler - a function that returns an observable handler when invoked.
 * @param {Object} config - Configuration object to be passed to the observable handler.
 * @param {Object} subscription - Subscription object to be passed to the observable handler.
 * @param {Object} context - Additional context or parameters for the observable handler.
 * @returns {{ isError: boolean, message: string }} An object containing error status and message.
 */
function extractErrorInfoFromObservable(observableHandler, config, subscription, context) {
  // Invoke the observable handler with the provided parameters
  const result = getSubscriptionOrCommandErrorInfo(observableHandler)(config, subscription, context);

  // Return only the error status and message from the result
  return {
    isError: result.isError,
    message: result.message
  };
}

module.exports = extractErrorInfoFromObservable;
