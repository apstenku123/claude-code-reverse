/**
 * Retrieves or creates a transaction/span within the current async context and executes a callback with isBlobOrFileLikeObject.
 * Handles error reporting and ensures the span is properly ended.
 *
 * @param {Object} options - Configuration options for the transaction/span.
 * @param {Object} options.scope - The scope to use for the transaction/span.
 * @param {boolean} [options.onlyIfParent] - If true, only create a span if a parent span exists.
 * @param {boolean} [options.forceTransaction] - If true, forces creation of a transaction.
 * @param {Function} callback - The function to execute with the created span and a finish callback.
 * @returns {any} The result of the callback function, or error handling result if an error occurs.
 */
function getTransactionWithSpanContext(options, callback) {
  // Extract the span context from the options
  const spanContext = convertStartTimeToTimestamp(options);

  // Run within the async context to preserve tracing context
  return kq.runWithAsyncContext(() => {
    // Set the current scope for the operation
    return ly.withScope(options.scope, currentScope => {
      const currentHub = kq.getCurrentHub();
      const parentSpan = currentScope.getSpan();

      // Only create a new span if either onlyIfParent is false or a parentSpan exists
      const transactionOrSpan = options.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: options.forceTransaction,
            scope: currentScope
          });

      /**
       * Ends the transaction/span if isBlobOrFileLikeObject was created.
       */
      function finishSpan() {
        if (transactionOrSpan) {
          transactionOrSpan.end();
        }
      }

      // Handle errors in the callback, and set span status if an error occurs
      return hU1.handleCallbackErrors(
        () => callback(transactionOrSpan, finishSpan),
        () => {
          if (transactionOrSpan && transactionOrSpan.isRecording()) {
            const { status } = n21.spanToJSON(transactionOrSpan);
            // If status is not set or is 'ok', mark as internal error
            if (!status || status === "ok") {
              transactionOrSpan.setStatus("internal_error");
            }
          }
        }
      );
    });
  });
}

module.exports = getTransactionWithSpanContext;