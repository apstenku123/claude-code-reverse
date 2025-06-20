/**
 * Handles an error for a given observable by first performing a custom error handling routine
 * and then invoking the observable'createInteractionAccessor onerror handler.
 *
 * @param {Object} sourceObservable - The observable object that encountered an error. Must have an onerror method.
 * @param {Object} errorConfig - The error configuration or error object to be passed to the handlers.
 * @param {Object} subscription - The subscription or context related to the error event.
 * @returns {void}
 */
function handleObservableError(sourceObservable, errorConfig, subscription) {
  // Perform custom error handling routine
  notifyQueueSubscribers(sourceObservable, errorConfig, subscription);
  // Invoke the observable'createInteractionAccessor onerror handler with the error configuration
  sourceObservable.onerror(errorConfig);
}

module.exports = handleObservableError;