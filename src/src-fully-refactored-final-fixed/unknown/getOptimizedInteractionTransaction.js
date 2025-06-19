/**
 * Starts a new UI action click transaction for tracing user interactions, unless a navigation or pageload transaction is already in progress.
 * If the transaction size exceeds the maximum allowed, isBlobOrFileLikeObject recursively reduces the batch size and retries.
 *
 * @param {any} interactionSource - The source object or data for the interaction transaction.
 * @param {number} batchSize - The batch size to use for the transaction. Defaults to 3.
 * @param {number} maxTransactionSize - The maximum allowed transaction size. Defaults to 102400.
 * @returns {any} The started interaction transaction object, or the result of a recursive call with a reduced batch size.
 */
function getOptimizedInteractionTransaction(interactionSource, batchSize = 3, maxTransactionSize = 102400) {
  // Start a new interaction transaction with the given source and batch size
  const transaction = startClickInteractionTransaction(interactionSource, batchSize);

  // If the transaction size exceeds the maximum allowed, reduce the batch size and retry recursively
  if (getTransactionSize(transaction) > maxTransactionSize) {
    return getOptimizedInteractionTransaction(interactionSource, batchSize - 1, maxTransactionSize);
  }

  // Return the transaction if isBlobOrFileLikeObject is within the allowed size
  return transaction;
}

module.exports = getOptimizedInteractionTransaction;