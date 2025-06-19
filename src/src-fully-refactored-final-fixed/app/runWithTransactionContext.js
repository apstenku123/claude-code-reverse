/**
 * Executes a callback within a transaction context, handling errors and transaction status.
 *
 * @param {Object} transactionOptions - Options for the transaction context.
 * @param {Function} callback - The function to execute within the transaction context. Receives the transaction/span as argument.
 * @returns {any} The result of the callback function.
 */
function runWithTransactionContext(transactionOptions, callback) {
  // Extract span context from the transaction options
  const spanContext = convertStartTimeToTimestamp(transactionOptions);

  // Run the following logic within an async context
  return kq.runWithAsyncContext(() => {
    // Set up a new scope for this transaction
    return ly.withScope(transactionOptions.scope, (scopeInstance) => {
      // Get the current hub (context for error tracking, etc.)
      const currentHub = kq.getCurrentHub();
      // Get the parent span from the current scope, if any
      const parentSpan = scopeInstance.getSpan();

      // Only create a new transaction/span if either:
      // - onlyIfParent is false, or
      // - onlyIfParent is true and there is a parent span
      const transaction = transactionOptions.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: transactionOptions.forceTransaction,
            scope: scopeInstance
          });

      // Execute the callback, handling errors and ensuring the transaction ends
      return hU1.handleCallbackErrors(
        // Main callback logic
        () => callback(transaction),
        // Error handler: set transaction status to 'internal_error' if needed
        () => {
          if (transaction) {
            const { status } = n21.spanToJSON(transaction);
            if (!status || status === "ok") {
              transaction.setStatus("internal_error");
            }
          }
        },
        // Always end the transaction if isBlobOrFileLikeObject was created
        () => {
          if (transaction) {
            transaction.end();
          }
        }
      );
    });
  });
}

module.exports = runWithTransactionContext;