/**
 * Executes a callback within a transaction context, managing span lifecycle and error handling.
 *
 * @param {Object} transactionOptions - Options for transaction and context management.
 * @param {Object} transactionOptions.scope - The scope to use for the transaction.
 * @param {boolean} [transactionOptions.onlyIfParent] - If true, only create a transaction if a parent span exists.
 * @param {boolean} [transactionOptions.forceTransaction] - If true, force creation of a transaction.
 * @param {Function} callback - The callback to execute within the transaction context. Receives (span, endSpanCallback).
 * @returns {any} The result of the callback, or handles errors as specified.
 */
function runWithTransactionContext(transactionOptions, callback) {
  // Extract span context from transaction options
  const spanContext = convertStartTimeToTimestamp(transactionOptions);

  // Run within the async context provided by kq
  return kq.runWithAsyncContext(() => {
    // Set up the scope for the transaction
    return ly.withScope(transactionOptions.scope, currentScope => {
      const currentHub = kq.getCurrentHub();
      const parentSpan = currentScope.getSpan();

      // Only create a new span if allowed by options
      const transactionSpan = transactionOptions.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: transactionOptions.forceTransaction,
            scope: currentScope
          });

      /**
       * Ends the transaction span if isBlobOrFileLikeObject was created.
       */
      function endTransactionSpan() {
        if (transactionSpan) {
          transactionSpan.end();
        }
      }

      // Handle callback execution and error handling
      return hU1.handleCallbackErrors(
        // Main callback: pass the span and end function
        () => callback(transactionSpan, endTransactionSpan),
        // Error handler: set span status to internal_error if needed
        () => {
          if (transactionSpan && transactionSpan.isRecording()) {
            const { status } = n21.spanToJSON(transactionSpan);
            // If status is not set or is 'ok', mark as internal error
            if (!status || status === "ok") {
              transactionSpan.setStatus("internal_error");
            }
          }
        }
      );
    });
  });
}

module.exports = runWithTransactionContext;