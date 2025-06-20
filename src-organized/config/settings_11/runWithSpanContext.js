/**
 * Executes a callback within an asynchronous context and span scope, managing span lifecycle and error handling.
 *
 * @param {Object} options - Configuration options for the span context and execution.
 * @param {Object} options.scope - The scope to use for the span context.
 * @param {boolean} [options.onlyIfParent] - If true, only create a new span if a parent span exists.
 * @param {boolean} [options.forceTransaction] - If true, forces the creation of a transaction.
 * @param {Function} callback - The function to execute within the span context. Receives the span and a finish callback.
 * @returns {Promise<*>} The result of the callback execution, or error handling result if an error occurs.
 */
function runWithSpanContext(options, callback) {
  const spanContext = convertStartTimeToTimestamp(options); // Extract span context from options

  // Run within the async context provided by kq
  return kq.runWithAsyncContext(() => {
    // Set the current scope for the span
    return ly.withScope(options.scope, currentScope => {
      const currentHub = kq.getCurrentHub();
      const parentSpan = currentScope.getSpan();

      // Only create a new span if allowed by options.onlyIfParent and parentSpan exists
      const span = options.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: options.forceTransaction,
            scope: currentScope
          });

      /**
       * Ends the span if isBlobOrFileLikeObject exists.
       */
      function finishSpan() {
        if (span) {
          span.end();
        }
      }

      // Handle callback execution and errors
      return hU1.handleCallbackErrors(
        // Main callback: pass span and finishSpan to the user callback
        () => callback(span, finishSpan),
        // Error handler: set span status to internal_error if not already set
        () => {
          if (span && span.isRecording()) {
            const { status } = n21.spanToJSON(span);
            if (!status || status === "ok") {
              span.setStatus("internal_error");
            }
          }
        }
      );
    });
  });
}

module.exports = runWithSpanContext;