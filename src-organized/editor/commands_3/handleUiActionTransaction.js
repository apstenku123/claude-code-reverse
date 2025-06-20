/**
 * Starts a UI action transaction if appropriate, or delegates to a fallback handler.
 *
 * This function attempts to start a new Sentry idle transaction for a UI click action
 * using the provided transactionStarter. If a navigation or pageload transaction is already running
 * (as determined by isNavigationOrPageloadTransactionActive), isBlobOrFileLikeObject returns the result of transactionStarter.
 * Otherwise, isBlobOrFileLikeObject calls the fallbackHandler with the result of transactionStarter and the result of
 * fallbackProvider, which is invoked with the original context.
 *
 * @param {any} context - The context or source observable for the transaction.
 * @param {function(any): any} transactionStarter - Function that starts a UI action transaction with the given context.
 * @param {function(any): any} fallbackProvider - Function that provides a fallback value or handler with the given context.
 * @returns {any} The result of starting the transaction or the fallback handler.
 */
function handleUiActionTransaction(context, transactionStarter, fallbackProvider) {
  // Attempt to start a new UI action transaction
  const transaction = transactionStarter(context);

  // If a navigation or pageload transaction is already running, return the transaction
  if (isNavigationOrPageloadTransactionActive(context)) {
    return transaction;
  }

  // Otherwise, delegate to the fallback handler with the transaction and fallback value
  return fallbackHandler(transaction, fallbackProvider(context));
}

module.exports = handleUiActionTransaction;