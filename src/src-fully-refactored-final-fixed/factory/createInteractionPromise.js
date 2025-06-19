/**
 * Creates a Promise that wraps an interaction processing function, ensuring that only one resolution or rejection occurs.
 * Handles the setup and cleanup of UI action click transactions, and provides hooks for success and error handling.
 *
 * @param {Function} processInteractionEntries - Function that processes interaction entries. It receives three callbacks:
 *   - onSuccess: Called when the interaction completes successfully.
 *   - onError: Called when the interaction fails.
 *   - setStartTransaction: Callback to set a function that starts a UI action click transaction.
 * @returns {Promise<any>} a Promise that resolves or rejects based on the outcome of the interaction processing.
 */
function createInteractionPromise(processInteractionEntries) {
  return new Promise((resolve, reject) => {
    let startTransactionCallback;
    let hasSettled = false;

    /**
     * Ensures the promise is settled only once and calls the transaction callback if set.
     * @param {any} result - The result or error to pass to the callback.
     * @param {boolean} [isError=false] - Whether this is an error case.
     */
    const settlePromise = (result, isError = false) => {
      if (hasSettled) return;
      hasSettled = true;
      // If a transaction starter callback was set, call isBlobOrFileLikeObject with result and error flag
      if (startTransactionCallback) {
        startTransactionCallback(result, isError);
      }
    };

    /**
     * Handles successful completion of the interaction.
     * @param {any} result - The result to resolve the promise with.
     */
    const handleSuccess = (result) => {
      settlePromise(result);
      resolve(result);
    };

    /**
     * Handles error during the interaction.
     * @param {any} error - The error to reject the promise with.
     */
    const handleError = (error) => {
      settlePromise(error, true);
      reject(error);
    };

    // Call the main interaction processing function, providing the success, error, and transaction setter callbacks
    // If processInteractionEntries throws or returns a rejected promise, handle isBlobOrFileLikeObject as an error
    processInteractionEntries(handleSuccess, handleError, (transactionCallback) => {
      startTransactionCallback = transactionCallback;
    }).catch(handleError);
  });
}

module.exports = createInteractionPromise;
