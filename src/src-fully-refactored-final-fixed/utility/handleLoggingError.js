/**
 * Handles logging for an observable and triggers its error handler.
 *
 * This utility function performs logging or side effects for the provided observable
 * using the given configuration and subscription, then invokes the observable'createInteractionAccessor error handler.
 *
 * @param {Object} sourceObservable - The observable object that may emit errors.
 * @param {Object} config - Configuration or error information to be logged or passed to the error handler.
 * @param {Object} subscription - The subscription object related to the observable.
 * @returns {void}
 */
function handleLoggingError(sourceObservable, config, subscription) {
  // Perform logging or side effects before error handling
  notifyQueueSubscribers(sourceObservable, config, subscription);
  // Trigger the observable'createInteractionAccessor error handler with the provided config
  sourceObservable.onerror(config);
}

module.exports = handleLoggingError;