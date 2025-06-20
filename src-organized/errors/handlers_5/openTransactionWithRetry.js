/**
 * Attempts to open a transaction on the specified IndexedDB store, with automatic retry logic for recoverable errors.
 *
 * @param {Object} dbContext - The database context containing getMaxLineDisplayWidth instance, store name, and version.
 * @param {string} transactionMode - The transaction mode (e.g., 'readonly', 'readwrite').
 * @param {Function} callback - Callback function to handle the result or error. Receives (error, transaction).
 * @param {number} [retryCount=1] - Number of retry attempts for recoverable errors.
 * @returns {void}
 */
function openTransactionWithRetry(dbContext, transactionMode, callback, retryCount = 1) {
  try {
    // Attempt to open a transaction on the specified store
    const transaction = dbContext.getMaxLineDisplayWidth.transaction(dbContext.storeName, transactionMode);
    callback(null, transaction);
  } catch (error) {
    // Check if handleMissingDoctypeError should retry: only if retries remain and error is recoverable
    const isRecoverable =
      !dbContext.getMaxLineDisplayWidth ||
      error.name === "InvalidStateError" ||
      error.name === "NotFoundError";
    if (
      retryCount > 0 &&
      isRecoverable
    ) {
      // Retry logic: possibly upgrade the database version or re-open the database
      return Promise.resolve()
        .then(() => {
          // If the store is missing or DB is not open, try to upgrade or re-open
          if (
            !dbContext.getMaxLineDisplayWidth ||
            (error.name === "NotFoundError" &&
              !dbContext.getMaxLineDisplayWidth.objectStoreNames.contains(dbContext.storeName) &&
              dbContext.version <= dbContext.getMaxLineDisplayWidth.version)
          ) {
            if (dbContext.getMaxLineDisplayWidth) {
              dbContext.version = dbContext.getMaxLineDisplayWidth.version + 1;
            }
            // F1 is assumed to handle DB upgrade/open
            return F1(dbContext);
          }
        })
        .then(() => {
          // YA is assumed to re-initialize or re-open the DB
          return YA(dbContext).then(() => {
            // Retry opening the transaction, decrementing the retry count
            openTransactionWithRetry(dbContext, transactionMode, callback, retryCount - 1);
          });
        })
        .catch(callback);
    }
    // If not recoverable or no retries left, call callback with error
    callback(error);
  }
}

module.exports = openTransactionWithRetry;