/**
 * Creates a function that logs errors from an observable using the application'createInteractionAccessor diagnostic logger.
 *
 * @returns {function(observable: any): void} a function that takes an observable and logs its errors.
 */
function createErrorLogger() {
  /**
   * Logs errors from the provided observable using the diagnostic logger.
   *
   * @param {any} sourceObservable - The observable whose errors should be logged.
   */
  return function logObservableError(sourceObservable) {
    // Log the error from the observable using the diagnostic logger
    lg4.diag.error(serializeInteractionEntries(sourceObservable));
  };
}

module.exports = createErrorLogger;