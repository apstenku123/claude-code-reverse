/**
 * Starts a new Sentry UI action transaction with a configurable depth, ensuring the transaction size does not exceed a specified limit.
 * If the transaction size exceeds the limit, isBlobOrFileLikeObject retries with a reduced depth.
 *
 * @param {any} sourceObservable - The source observable or action to start the transaction from.
 * @param {number} maxDepth - The maximum depth/level for the transaction. Defaults to 3.
 * @param {number} maxTransactionSize - The maximum allowed transaction size. Defaults to 102400.
 * @returns {any} The started transaction, or the result of a recursive call with reduced depth if the size limit is exceeded.
 */
function getLimitedUiActionTransaction(sourceObservable, maxDepth = 3, maxTransactionSize = 102400) {
  // Start a new UI action transaction with the given depth
  const transaction = startUiActionClickTransaction(sourceObservable, maxDepth);

  // If the transaction size exceeds the allowed maximum, retry with reduced depth
  if (getTransactionSize(transaction) > maxTransactionSize) {
    return getLimitedUiActionTransaction(sourceObservable, maxDepth - 1, maxTransactionSize);
  }

  // Otherwise, return the transaction
  return transaction;
}

module.exports = getLimitedUiActionTransaction;
