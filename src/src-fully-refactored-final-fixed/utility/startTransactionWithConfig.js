/**
 * Starts a new transaction using the current hub, merging the provided transaction context and configuration.
 *
 * @param {Object} transactionContext - The context object containing transaction details (e.g., name, operation, etc.).
 * @param {Object} transactionConfig - Additional configuration options for the transaction.
 * @returns {Object} The started transaction object.
 */
function startTransactionWithConfig(transactionContext, transactionConfig) {
  // Retrieve the current hub and start a new transaction with the merged context and configuration
  return KQ.getCurrentHub().startTransaction({
    ...transactionContext
  }, transactionConfig);
}

module.exports = startTransactionWithConfig;