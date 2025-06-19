/**
 * Attempts to execute a database transaction, with automatic retry logic for certain errors.
 *
 * @param {Object} dbContext - The database context, containing the database instance, store name, and version.
 * @param {string} transactionMode - The transaction mode (e.g., 'readonly', 'readwrite').
 * @param {Function} callback - Callback function to handle the result or error. Signature: (error, transaction) => void
 * @param {number} [retryCount=1] - Number of retry attempts allowed for recoverable errors.
 * @returns {void|Promise<void>} Returns nothing directly, but may return a promise if a retry is scheduled.
 */
function executeDatabaseTransactionWithRetry(dbContext, transactionMode, callback, retryCount = 1) {
  try {
    // Attempt to create a transaction on the specified object store
    const transaction = dbContext.getMaxLineDisplayWidth.transaction(dbContext.storeName, transactionMode);
    callback(null, transaction);
  } catch (error) {
    // Check if handleMissingDoctypeError should retry: only for certain errors and if retries remain
    const isRecoverableError = (
      !dbContext.getMaxLineDisplayWidth ||
      error.name === "InvalidStateError" ||
      error.name === "NotFoundError"
    );
    if (
      retryCount > 0 &&
      isRecoverableError
    ) {
      // Schedule a retry after attempting to recover the database connection/state
      return Promise.resolve().then(() => {
        // If the DB is missing, the store is missing, or the version is outdated, try to upgrade
        if (
          !dbContext.getMaxLineDisplayWidth ||
          (error.name === "NotFoundError" &&
            !dbContext.getMaxLineDisplayWidth.objectStoreNames.contains(dbContext.storeName) &&
            dbContext.version <= dbContext.getMaxLineDisplayWidth.version)
        ) {
          if (dbContext.getMaxLineDisplayWidth) {
            dbContext.version = dbContext.getMaxLineDisplayWidth.version + 1;
          }
          // Attempt to upgrade or reopen the database
          return upgradeDatabase(dbContext);
        }
      }).then(() => {
        // After recovery, re-attempt the transaction (with one fewer retry allowed)
        return reopenDatabase(dbContext).then(() => {
          executeDatabaseTransactionWithRetry(dbContext, transactionMode, callback, retryCount - 1);
        });
      }).catch(callback);
    }
    // If not recoverable or out of retries, report the error
    callback(error);
  }
}

module.exports = executeDatabaseTransactionWithRetry;