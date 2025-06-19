/**
 * Executes a callback within a transaction scope, handling errors and transaction status.
 *
 * @param {Object} transactionOptions - Options for the transaction execution.
 * @param {Object} transactionOptions.scope - The scope to use for the transaction.
 * @param {boolean} [transactionOptions.onlyIfParent] - If true, only create a transaction if a parent span exists.
 * @param {boolean} [transactionOptions.forceTransaction] - If true, force creation of a transaction.
 * @param {Function} callback - The function to execute within the transaction context. Receives the created transaction/span as an argument.
 * @returns {any} The result of the callback function.
 */
function runWithTransactionScope(transactionOptions, callback) {
  // Extract the span context from the transaction options
  const spanContext = convertStartTimeToTimestamp(transactionOptions);

  // Run the logic within an async context
  return kq.runWithAsyncContext(() => {
    // Set up the scope for the transaction
    return ly.withScope(transactionOptions.scope, (currentScope) => {
      // Get the current hub (context for error tracking, etc.)
      const currentHub = kq.getCurrentHub();
      // Get the current parent span from the scope
      const parentSpan = currentScope.getSpan();

      // Determine whether to create a new transaction/span
      // If onlyIfParent is true and there is no parent span, do not create a new transaction
      const transaction = transactionOptions.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: transactionOptions.forceTransaction,
            scope: currentScope
          });

      // Handle errors in the callback, update transaction status if needed, and ensure transaction is ended
      return hU1.handleCallbackErrors(
        () => callback(transaction),
        () => {
          // On error, set transaction status to 'internal_error' if not already set
          if (transaction) {
            const { status } = n21.spanToJSON(transaction);
            if (!status || status === "ok") {
              transaction.setStatus("internal_error");
            }
          }
        },
        // Always end the transaction if isBlobOrFileLikeObject was created
        () => transaction && transaction.end()
      );
    });
  });
}

module.exports = runWithTransactionScope;