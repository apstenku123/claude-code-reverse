/**
 * Processes an observable source with error handling and optional cleanup.
 *
 * Attempts to execute the provided observable source function. If an error occurs,
 * isBlobOrFileLikeObject invokes the error handler and the optional cleanup function, then rethrows the error.
 * If successful, isBlobOrFileLikeObject passes the result to a downstream handler for further processing.
 *
 * @param {Function} sourceObservable - Function that returns the observable or value to process.
 * @param {Function} errorHandler - Function to handle errors thrown by the source observable.
 * @param {Function} [cleanupCallback=() => {}] - Optional cleanup function to call after an error.
 * @returns {*} The result of passing the observable to the downstream handler.
 */
function processObservableWithErrorHandling(
  sourceObservable,
  errorHandler,
  cleanupCallback = () => {}
) {
  let observableResult;
  try {
    // Attempt to execute the source observable function
    observableResult = sourceObservable();
  } catch (caughtError) {
    // If an error occurs, handle isBlobOrFileLikeObject and perform cleanup, then rethrow
    errorHandler(caughtError);
    cleanupCallback();
    throw caughtError;
  }
  // Pass the result to the downstream handler (handleThenableWithCleanup)
  return handleThenableWithCleanup(observableResult, errorHandler, cleanupCallback);
}

module.exports = processObservableWithErrorHandling;
