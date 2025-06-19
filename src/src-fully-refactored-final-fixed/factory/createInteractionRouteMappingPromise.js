/**
 * Creates a Promise that manages the mapping of user interactions to route names, handling completion and error states.
 *
 * @param {function} mapInteractionsToRouteNames - Function that processes user interactions and maps them to route names. It receives three callbacks: onSuccess, onError, and setStartTransactionHandler.
 * @returns {Promise<any>} Promise that resolves with the result of the mapping or rejects if an error occurs.
 */
function createInteractionRouteMappingPromise(mapInteractionsToRouteNames) {
  return new Promise((resolve, reject) => {
    let startTransactionHandler = null;
    let isSettled = false;

    /**
     * Ensures the promise is only settled once, and calls the startTransactionHandler if set.
     * @param {any} result - The result to pass to the handler.
     * @param {boolean} [isError=false] - Whether this is an error case.
     */
    const settle = (result, isError = false) => {
      if (isSettled) return;
      isSettled = true;
      if (startTransactionHandler) {
        startTransactionHandler(result, isError);
      }
    };

    /**
     * Handles successful completion of the mapping.
     * @param {any} result - The result to resolve with.
     */
    const handleSuccess = (result) => {
      settle(result);
      resolve(result);
    };

    /**
     * Handles errors during the mapping process.
     * @param {any} error - The error to reject with.
     */
    const handleError = (error) => {
      settle(error, true);
      reject(error);
    };

    // Call the mapping function, passing in the success, error, and transaction handler setters
    // If the mapping function returns a rejected promise, handle isBlobOrFileLikeObject as an error
    mapInteractionsToRouteNames(handleSuccess, handleError, handler => {
      startTransactionHandler = handler;
    }).catch(handleError);
  });
}

module.exports = createInteractionRouteMappingPromise;