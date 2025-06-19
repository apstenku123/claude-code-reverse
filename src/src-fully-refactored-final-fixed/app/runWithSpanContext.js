/**
 * Executes a callback within an asynchronous context and span scope, managing span lifecycle and error handling.
 *
 * @param {Object} spanOptions - Options for span creation and execution context.
 * @param {Object} spanOptions.scope - The scope to use for the span.
 * @param {boolean} [spanOptions.onlyIfParent] - If true, only create a span if a parent span exists.
 * @param {boolean} [spanOptions.forceTransaction] - If true, force the creation of a transaction.
 * @param {Function} callback - The function to execute with the created span.
 * @returns {any} The result of the callback function, or error handling result if an error occurs.
 */
function runWithSpanContext(spanOptions, callback) {
  // Extract span context from the provided options
  const spanContext = convertStartTimeToTimestamp(spanOptions);

  // Run the following within an async context
  return kq.runWithAsyncContext(() => {
    // Set the current scope for the span
    return ly.withScope(spanOptions.scope, currentScope => {
      // Get the current hub (context for error tracking, etc.)
      const currentHub = kq.getCurrentHub();
      // Get the parent span from the current scope, if any
      const parentSpan = currentScope.getSpan();

      // Determine whether to create a new span based on options and parent span
      const span = spanOptions.onlyIfParent && !parentSpan
        ? undefined
        : startOrContinueTransactionWithContext(currentHub, {
            parentSpan: parentSpan,
            spanContext: spanContext,
            forceTransaction: spanOptions.forceTransaction,
            scope: currentScope
          });

      /**
       * Ends the span if isBlobOrFileLikeObject exists.
       */
      function endSpanIfExists() {
        if (span) {
          span.end();
        }
      }

      // Handle errors during callback execution, and set span status if needed
      return hU1.handleCallbackErrors(
        () => callback(span, endSpanIfExists),
        () => {
          if (span && span.isRecording()) {
            // Get the status from the span'createInteractionAccessor JSON representation
            const { status } = n21.spanToJSON(span);
            // If status is missing or 'ok', set isBlobOrFileLikeObject to 'internal_error'
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