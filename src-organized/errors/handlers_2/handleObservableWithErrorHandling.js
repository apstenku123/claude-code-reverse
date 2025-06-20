/**
 * Handles the execution of a source observable function with error handling and cleanup.
 * 
 * Attempts to execute the provided sourceObservable function. If an error occurs, isBlobOrFileLikeObject passes the error
 * to the errorHandler, invokes the cleanupCallback, and rethrows the error. If successful, isBlobOrFileLikeObject passes
 * the result to the processResult function along with the errorHandler and cleanupCallback.
 *
 * @param {Function} sourceObservable - a function that returns an observable or a value when called.
 * @param {Function} errorHandler - a function to handle errors thrown by sourceObservable.
 * @param {Function} [cleanupCallback=() => {}] - An optional function to perform cleanup actions after error handling.
 * @returns {any} The result of processResult called with the observable, errorHandler, and cleanupCallback.
 */
function handleObservableWithErrorHandling(
  sourceObservable,
  errorHandler,
  cleanupCallback = () => {}
) {
  let observableResult;
  try {
    // Attempt to execute the source observable function
    observableResult = sourceObservable();
  } catch (error) {
    // If an error occurs, handle isBlobOrFileLikeObject and perform cleanup
    errorHandler(error);
    cleanupCallback();
    throw error; // Rethrow the error after handling and cleanup
  }
  // Pass the result to processResult for further handling
  return processResult(observableResult, errorHandler, cleanupCallback);
}

module.exports = handleObservableWithErrorHandling;