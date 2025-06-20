/**
 * Creates a Promise that wraps the process of mapping user interactions to routes, managing activity state, and handling UI action click transactions.
 * Ensures that the transaction is only finalized once, and provides hooks for both success and error outcomes.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interactions, mapping them to routes and managing metadata.
 *   Signature: (onSuccess, onError, setTransactionHandler) => Promise
 *   - onSuccess: Callback to call when the process succeeds.
 *   - onError: Callback to call when the process fails.
 *   - setTransactionHandler: Callback to set a handler for transaction completion.
 * @returns {Promise} Promise that resolves or rejects based on the outcome of the mapping process.
 */
function createInteractionTransactionPromise(mapInteractionsToRoutes) {
  return new Promise((resolve, reject) => {
    let transactionHandler = null;
    let isFinalized = false;

    /**
     * Ensures the transaction is finalized only once, and calls the handler if set.
     * @param {*} result - The result to pass to the handler.
     * @param {boolean} [isError=false] - Whether this is an error case.
     */
    const finalizeTransaction = (result, isError = false) => {
      if (isFinalized) return;
      isFinalized = true;
      if (transactionHandler) {
        transactionHandler(result, isError);
      }
    };

    /**
     * Success callback: Finalizes and resolves the promise.
     * @param {*} result - The result to resolve with.
     */
    const handleSuccess = (result) => {
      finalizeTransaction(result);
      resolve(result);
    };

    /**
     * Error callback: Finalizes and rejects the promise.
     * @param {*} error - The error to reject with.
     */
    const handleError = (error) => {
      finalizeTransaction(error, true);
      reject(error);
    };

    // Call the main mapping function, providing the success, error, and transaction handler setter callbacks.
    // If the mapping function throws, handle as error.
    mapInteractionsToRoutes(handleSuccess, handleError, handler => {
      transactionHandler = handler;
    }).catch(handleError);
  });
}

module.exports = createInteractionTransactionPromise;